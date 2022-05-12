import axiosInstance from "./fetch";

async function signUp({ name, email, password }) {
  try {
    const result = await axiosInstance.post("/user/signup", {
      name,
      email,
      password,
    });
    const token = result.data.token;
    const user = result.data.user;
    axiosInstance.setToken(token);
    return user;
  } catch (e) {
    throw new Error("Invalid email or password");
  }
}

async function signIn({ email, password }) {
  try {
    const result = await axiosInstance.post("/user/signin", {
      email,
      password,
    });
    const token = result.data.token;
    const user = result.data.user;
    await axiosInstance.setToken(token);
    return user;
  } catch {
    throw new Error("Invalid email or password");
  }
}

async function getUser() {
  const result = await axiosInstance.get("/user/me");
  const user = result.data;
  return user;
}

export default { signUp, signIn, getUser };
