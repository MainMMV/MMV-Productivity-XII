// import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

function createMockEntities() {
  const getList = (name: string) => JSON.parse(localStorage.getItem(`mock_${name}`) || '[]');
  const saveList = (name: string, data: any[]) => localStorage.setItem(`mock_${name}`, JSON.stringify(data));

  const makeEntity = (name: string) => ({
    list: async () => getList(name),
    filter: async (filters: any) => {
      const list = getList(name);
      return list.filter((item: any) => Object.entries(filters).every(([k,v]) => item[k] === v));
    },
    create: async (data: any) => {
      const list = getList(name);
      const id = crypto.randomUUID?.() || Date.now().toString();
      const newItem = { id, ...data };
      saveList(name, [...list, newItem]);
      return newItem;
    },
    update: async (id: string, diff: any) => {
      const list = getList(name);
      const idx = list.findIndex((i: any) => i.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...diff };
        saveList(name, list);
        return list[idx];
      }
      throw new Error("Not found");
    },
    delete: async (id: string) => {
      const list = getList(name);
      saveList(name, list.filter((i: any) => i.id !== id));
      return { success: true };
    }
  });

  return {
    Habit: makeEntity("Habit"),
    Task: makeEntity("Task"),
    Expense: makeEntity("Expense"),
    Income: makeEntity("Income"),
    Subscription: makeEntity("Subscription"),
    Goal: makeEntity("Goal"),
    UserSettings: makeEntity("UserSettings")
  };
}

export const base44 = {
  auth: {
    me: async () => ({ id: "user_1", displayName: "Local User" }),
    logout: () => { localStorage.clear(); window.location.reload(); },
    redirectToLogin: () => {}
  },
  entities: createMockEntities(),
  integrations: {
    Core: {
      InvokeLLM: async () => { return { rate: 12500 } }
    }
  }
} as any;

export default base44;
