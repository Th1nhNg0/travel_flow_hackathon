import axiosInstance from "./fetch";

async function getLocations({ page, search }) {
  const result = await axiosInstance.get(
    `/location?page=${page}&search=${encodeURI(search)}`
  );
  const location = result.data;
  return location;
}

async function getOneLocation(id) {
  const result = await axiosInstance.get(`/location/${id}`);
  const location = result.data;
  return location;
}

export default { getLocations, getOneLocation };
