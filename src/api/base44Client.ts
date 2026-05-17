import { supabase } from '@/lib/supabase';

let isAuthenticated = false;

export const setAuthState = (isAuth: boolean) => {
  isAuthenticated = isAuth;
};

const getLocalList = (name: string) => JSON.parse(localStorage.getItem(`local_${name}`) || '[]');
const saveLocalList = (name: string, data: any[]) => localStorage.setItem(`local_${name}`, JSON.stringify(data));

function createEntity(tableName: string) {
  return {
    list: async (orderBy?: string, limit?: number) => {
      if (!isAuthenticated) {
        let list = getLocalList(tableName);
        if (orderBy) {
          const desc = orderBy.startsWith('-');
          const key = desc ? orderBy.slice(1) : orderBy;
          list.sort((a: any, b: any) => {
            if (a[key] < b[key]) return desc ? 1 : -1;
            if (a[key] > b[key]) return desc ? -1 : 1;
            return 0;
          });
        }
        if (limit) list = list.slice(0, limit);
        return list;
      }
      let query = supabase.from(tableName).select('*');
      if (orderBy) {
        const desc = orderBy.startsWith('-');
        query = query.order(desc ? orderBy.slice(1) : orderBy, { ascending: !desc });
      }
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) {
        console.error(`Error in list ${tableName}:`, error);
        return [];
      }
      return data;
    },
    filter: async (filters: any) => {
      if (!isAuthenticated) {
        const list = getLocalList(tableName);
        return list.filter((item: any) => Object.entries(filters).every(([k, v]) => item[k] === v));
      }
      let query = supabase.from(tableName).select('*');
      for (const [k, v] of Object.entries(filters)) {
        query = query.eq(k, v);
      }
      const { data, error } = await query;
      if (error) {
        console.error(`Error in filter ${tableName}:`, error);
        return [];
      }
      return data;
    },
    create: async (payload: any) => {
      if (!isAuthenticated) {
        const list = getLocalList(tableName);
        // Add random id if missing
        const id = crypto.randomUUID?.() || Date.now().toString();
        const newItem = { id, created_at: new Date().toISOString(), ...payload };
        saveLocalList(tableName, [...list, newItem]);
        return newItem;
      }
      const { data: result, error } = await supabase.from(tableName).insert(payload).select().single();
      if (error) {
        console.error(`Error in create ${tableName}:`, error);
        throw error;
      }
      return result;
    },
    update: async (id: string, diff: any) => {
      if (!isAuthenticated) {
        const list = getLocalList(tableName);
        const idx = list.findIndex((i: any) => i.id === id);
        if (idx !== -1) {
          list[idx] = { ...list[idx], ...diff, updated_at: new Date().toISOString() };
          saveLocalList(tableName, list);
          return list[idx];
        }
        throw new Error("Not found locally");
      }
      const { data: result, error } = await supabase.from(tableName).update(diff).eq('id', id).select().single();
      if (error) {
        console.error(`Error in update ${tableName}:`, error);
        throw error;
      }
      return result;
    },
    delete: async (id: string) => {
      if (!isAuthenticated) {
        const list = getLocalList(tableName);
        saveLocalList(tableName, list.filter((i: any) => i.id !== id));
        return { success: true };
      }
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) {
        console.error(`Error in delete ${tableName}:`, error);
        throw error;
      }
      return { success: true };
    }
  };
}

export const base44 = {
  auth: {
    me: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setAuthState(true);
        return { id: session.user.id };
      }
      setAuthState(false);
      throw { status: 401, message: "Not logged in" };
    },
    logout: async () => {
      setAuthState(false);
      await supabase.auth.signOut();
      window.location.reload();
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
    UserSettings: createEntity("user_settings")
  },
  integrations: {
    Core: {
      InvokeLLM: async () => { return { rate: 12500 } }
    }
  }
} as any;

export default base44;
