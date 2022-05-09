import axiosInstance from "./fetch";

async function getLocation(page) {
  const result = await axiosInstance.get(`/location?page=${page}`);
  const location = result.data;
  return location;
}

async function getOneLocation(id) {
  const result = await axiosInstance.get(`/location/${id}`);
  const location = result.data;
  return location;
}

export default { getLocation, getOneLocation };
