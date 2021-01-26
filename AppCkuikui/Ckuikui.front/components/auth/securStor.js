import * as SecureStore from "expo-secure-store";

//function pour récuperer, stocker, donner la key idUser
const key = "authToken";

const storeToken = async (user) => {
  try {
    const newUser = JSON.stringify(user);
    await SecureStore.setItemAsync(key, newUser);
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    const newUser = await SecureStore.getItemAsync(key);
    return JSON.parse(newUser);
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  const newUser = await getToken();
  return newUser ? newUser : null;
};

export default { getUser, removeToken, storeToken };
