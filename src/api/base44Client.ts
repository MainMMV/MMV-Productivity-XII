import { db, auth } from '@/lib/firebase';
import { collection, doc, getDocs, getDoc, query, where, orderBy as fsOrderBy, limit as fsLimit, setDoc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { sendTelegramNotification } from '@/lib/telegramService';

let isAuthenticated = false;

function notifyTelegramForEntity(tableName: string, action: 'Created' | 'Updated' | 'Deleted', payload: any) {
  if (tableName === 'userSettings') return;
  const entityName = (tableName.charAt(0).toUpperCase() + tableName.slice(1)).replace(/s$/, '');
  const title = payload?.title || payload?.name || payload?.category || payload?.source || payload?.id || 'Workspace Item';
  const detailsParts = [];
  if (payload?.priority) detailsParts.push(`Priority: ${payload.priority}`);
  if (payload?.status) detailsParts.push(`Status: ${payload.status}`);
  if (payload?.due_date) detailsParts.push(`Due: ${payload.due_date}`);
  if (payload?.amount) detailsParts.push(`Amount: $${payload.amount}`);
  if (payload?.category) detailsParts.push(`Category: ${payload.category}`);
  if (payload?.source) detailsParts.push(`Source: ${payload.source}`);

  sendTelegramNotification({
    entity: entityName as any,
    action,
    title,
    details: detailsParts.join(' | ') || undefined,
  });
}

export const setAuthState = (isAuth: boolean) => {
  isAuthenticated = isAuth;
};

// Listen to firebase auth changes globally to keep isAuthenticated in sync
auth.onAuthStateChanged(user => {
  isAuthenticated = !!user;
});

const getLocalList = (name: string) => JSON.parse(localStorage.getItem(`local_${name}`) || '[]');
const saveLocalList = (name: string, data: any[]) => localStorage.setItem(`local_${name}`, JSON.stringify(data));

function createEntity(tableName: string) {
  return {
    list: async (orderByField?: string, limitCount?: number) => {
      if (!auth.currentUser) {
        let list = getLocalList(tableName);
        if (orderByField) {
          const desc = orderByField.startsWith('-');
          const key = desc ? orderByField.slice(1) : orderByField;
          list.sort((a: any, b: any) => {
            if (a[key] < b[key]) return desc ? 1 : -1;
            if (a[key] > b[key]) return desc ? -1 : 1;
            return 0;
          });
        }
        if (limitCount) list = list.slice(0, limitCount);
        return list;
      }
      
      try {
        const q = query(collection(db, tableName), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        let results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (orderByField) {
          const desc = orderByField.startsWith('-');
          const key = desc ? orderByField.slice(1) : orderByField;
          results.sort((a: any, b: any) => {
            if (a[key] < b[key]) return desc ? 1 : -1;
            if (a[key] > b[key]) return desc ? -1 : 1;
            return 0;
          });
        }
        if (limitCount) {
          results = results.slice(0, limitCount);
        }
        return results;
      } catch (error) {
        console.error(`Error in list ${tableName}:`, error);
        return [];
      }
    },
    filter: async (filters: any) => {
      if (!auth.currentUser) {
        const list = getLocalList(tableName);
        return list.filter((item: any) => Object.entries(filters).every(([k, v]) => item[k] === v));
      }
      
      try {
        const q = query(collection(db, tableName), where('userId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return results.filter((item: any) => Object.entries(filters).every(([k, v]) => item[k] === v));
      } catch (error) {
        console.error(`Error in filter ${tableName}:`, error);
        return [];
      }
    },
    create: async (payload: any) => {
      let resItem: any;
      if (!auth.currentUser) {
        const list = getLocalList(tableName);
        const id = crypto.randomUUID?.() || Date.now().toString();
        resItem = { id, created_at: new Date().toISOString(), ...payload };
        saveLocalList(tableName, [...list, resItem]);
      } else {
        try {
          const enhancedPayload = {
            ...payload,
            userId: auth.currentUser.uid,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
          const docRef = await addDoc(collection(db, tableName), enhancedPayload);
          resItem = { id: docRef.id, ...enhancedPayload };
        } catch (error) {
          console.error(`Error in create ${tableName}:`, error);
          throw error;
        }
      }
      notifyTelegramForEntity(tableName, 'Created', resItem);
      return resItem;
    },
    update: async (id: string, diff: any) => {
      let updatedItem: any;
      if (!auth.currentUser) {
        const list = getLocalList(tableName);
        const idx = list.findIndex((i: any) => i.id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...diff, updated_at: new Date().toISOString() };
          saveLocalList(tableName, list);
          updatedItem = list[idx];
        } else {
          throw new Error("Not found locally");
        }
      } else {
        try {
          const docRef = doc(db, tableName, id);
          const enhancedDiff = { ...diff, updated_at: new Date().toISOString() };
          await updateDoc(docRef, enhancedDiff);
          const updatedDoc = await getDoc(docRef);
          updatedItem = { id: updatedDoc.id, ...updatedDoc.data() };
        } catch (error) {
          console.error(`Error in update ${tableName}:`, error);
          throw error;
        }
      }
      notifyTelegramForEntity(tableName, 'Updated', updatedItem);
      return updatedItem;
    },
    delete: async (id: string) => {
      notifyTelegramForEntity(tableName, 'Deleted', { id });
      if (!auth.currentUser) {
        const list = getLocalList(tableName);
        saveLocalList(tableName, list.filter((i: any) => i.id !== id));
        return { success: true };
      }
      
      try {
        await deleteDoc(doc(db, tableName, id));
        return { success: true };
      } catch (error) {
        console.error(`Error in delete ${tableName}:`, error);
        throw error;
      }
    }
  };
}

export const base44 = {
  auth: {
    me: async () => {
      if (auth.currentUser) {
        setAuthState(true);
        return {
          id: auth.currentUser.uid,
          email: auth.currentUser.email,
          user_metadata: {
            full_name: auth.currentUser.displayName,
            avatar_url: auth.currentUser.photoURL
          }
        };
      }
      return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          unsubscribe();
          if (user) {
            setAuthState(true);
            resolve({
              id: user.uid,
              email: user.email,
              user_metadata: {
                full_name: user.displayName,
                avatar_url: user.photoURL
              }
            });
          } else {
            setAuthState(false);
            reject({ status: 401, message: "Not logged in" });
          }
        });
      });
    },
    logout: async () => {
      setAuthState(false);
      await auth.signOut();
    },
    redirectToLogin: () => {}
  },
  entities: {
    Habit: createEntity("habits"),
    Task: createEntity("tasks"),
    Expense: createEntity("expenses"),
    Income: createEntity("income"),
    Subscription: createEntity("subscriptions"),
    Goal: createEntity("goals"),
    UserSettings: createEntity("userSettings") // lowercase 's' match blueprint
  },
  integrations: {
    Core: {
      InvokeLLM: async () => { return { rate: 12500 } }
    }
  }
} as any;

export default base44;
