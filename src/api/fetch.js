import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "https://travel-flow-hackathon-2022.herokuapp.com";
const instance = axios.create({
  baseURL,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

async function getLocalToken() {
  const token = await AsyncStorage.getItem("token");
  return token;
}

instance.setToken = (token) => {
  instance.defaults.headers["Authorization"] = `Bearer ${token}`;
  await AsyncStorage.setItem("token", token);
};

instance.interceptors.request.use(async (config) => {
  const token = await getLocalToken();
  if (token) {
    instance.setToken(token);
  }
  return config;
});

export default instance;
