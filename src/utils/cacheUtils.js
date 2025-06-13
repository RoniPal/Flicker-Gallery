import AsyncStorage from "@react-native-async-storage/async-storage";

//Save images to AsyncStorage
export const saveImageCache = async (key, value) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

//Get images to AsyncStorage
export const getImageFromCache = async (key) => {
    const cached = await AsyncStorage.getItem(key);
    return cached ? JSON.parse(cached) : null
}