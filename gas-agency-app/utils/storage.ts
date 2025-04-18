import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER: 'user',
};

// Save user data to AsyncStorage
export const saveUserData = async (user: { name: string; email: string; phone: string; profileImage: string }) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user data to AsyncStorage:', error);
  }
};

// Get user data from AsyncStorage
export const getUserData = async (): Promise<{ name: string; email: string; phone: string; profileImage: string } | null> => {
  try {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    if (userData) {
      return JSON.parse(userData);
    }
    return null; // Return null if no data is found
  } catch (error) {
    console.error('Error fetching user data from AsyncStorage:', error);
    return null; // Return null on error
  }
};

// Remove user data from AsyncStorage
export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error removing user data from AsyncStorage:', error);
  }
};

// Save other data as needed (optional, add more keys in STORAGE_KEYS)
export const saveData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving data to AsyncStorage for key: ${key}`, error);
  }
};

// Get other data as needed (optional)
export const getData = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null; // Return null if no value is found
  } catch (error) {
    console.error(`Error fetching data from AsyncStorage for key: ${key}`, error);
    return null; // Return null on error
  }
};

// Remove other data (optional)
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data from AsyncStorage for key: ${key}`, error);
  }
};
