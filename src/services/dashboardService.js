import API from "./api";

// ==========================
// Dashboard KPI Data
// ==========================
export const getDashboard = async () => {

  const response = await API.get("/dashboard");

  return response.data;

};

// ==========================
// Recent Activity
// ==========================
export const getRecentActivity = async () => {

  const response = await API.get("/dashboard/activity");

  return response.data;

};