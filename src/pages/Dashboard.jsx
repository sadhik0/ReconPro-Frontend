import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import DashboardCard from "../components/DashboardCard";
import RecentActivity from "../components/RecentActivity";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    totalUploads: 0,
    totalTransactions: 0,
    matched: 0,
    unmatched: 0,
  });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const data = await getDashboard();

      setDashboard(data);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <div className="p-8">

          <div className="grid grid-cols-4 gap-6">

            <DashboardCard
              title="Uploads"
              value={dashboard.totalUploads}
              color="text-blue-600"
              icon="📁"
              change="Total Uploads"
            />

            <DashboardCard
              title="Records"
              value={dashboard.totalTransactions.toLocaleString()}
              color="text-green-600"
              icon="📊"
              change="Processed Records"
            />

            <DashboardCard
              title="Matched"
              value={dashboard.matched.toLocaleString()}
              color="text-emerald-600"
              icon="✅"
              change="Successfully Matched"
            />

            <DashboardCard
              title="Unmatched"
              value={dashboard.unmatched.toLocaleString()}
              color="text-red-600"
              icon="❌"
              change="Needs Review"
            />

          </div>

          <div className="mt-10">

            <RecentActivity />

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;