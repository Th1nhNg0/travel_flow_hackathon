import axiosInstance from "./fetch";

async function getPlans(page) {
  const result = await axiosInstance.get(`/plan?page=${page}`);
  const plans = result.data;
  return plans;
}
async function getPlan(id) {
  const result = await axiosInstance.get(`/plan/${id}`);
  const plan = result.data;
  return plan;
}

async function createPlan({ name }) {
  const result = await axiosInstance.post("/plan", { name });
  const createdPlan = result.data;
  return createdPlan;
}

async function updatePlan({ id, name }) {
  const result = await axiosInstance.put(`/plan/${id}`, { name });
  const updatedPlan = result.data;
  return updatedPlan;
}

async function deletePlan(id) {
  const result = await axiosInstance.delete(`/plan/${id}`);
  const deletedPlan = result.data;
  return deletedPlan;
}

async function addLocationToPlan({ planId, locationId, date, numberOfPeople }) {
  const result = await axiosInstance.post(`/plan/${planId}/location`, {
    locationId,
    date,
    numberOfPeople,
  });
  const addedLocation = result.data;
  return addedLocation;
}
async function editLocationInPlan({ id, numberOfPeople, date: date }) {
  const result = await axiosInstance.put(`/plan/location/${id}`, {
    numberOfPeople,
    date,
  });
  const editedLocation = result.data;
  return editedLocation;
}

export default {
  getPlans,
  getPlan,
  createPlan,
  deletePlan,
  updatePlan,
  addLocationToPlan,
  editLocationInPlan,
};
