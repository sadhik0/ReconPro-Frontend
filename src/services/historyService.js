import API from "./api";

export const saveHistory = async (historyData) => {

  const response = await API.post(
    "/history",
    historyData
  );

  return response.data;

};

export const getHistory = async () => {

  const response = await API.get("/history");

  return response.data;

};

export const deleteHistory = async (id) => {

  await API.delete(`/history/${id}`);

};