import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'USER';

export const saveUser = async (email: string) => {
  await AsyncStorage.setItem(USER_KEY, email);
};

export const getUser = async (): Promise<string | null> => {
  return await AsyncStorage.getItem(USER_KEY);
};

export const removeUser = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};

const STORAGE_KEY = 'tasks';

export const saveTasksToStorage = async (tasks: any[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage', error);
  }
};

export const getTasksFromStorage = async () => {
  try {
    const tasks = await AsyncStorage.getItem(STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error fetching tasks from storage', error);
    return [];
  }
};
