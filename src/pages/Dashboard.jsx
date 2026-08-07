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
    averageMatch: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const data = await getDashboard();

      setDashboard(data);

    } catch (err) {

      console.error("Dashboard Error:", err);

    }

  };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-2">
            ReconPro
          </h1>

          <p className="text-gray-500 mb-8">
            Welcome to ReconPro
          </p>

          <div className="grid grid-cols-4 gap-6">

            <DashboardCard
              title="Total Uploads"
              value={dashboard.totalUploads}
              icon="📁"
              color="text-blue-600"
              change="Reconciliations"
            />

            <DashboardCard
              title="Transactions"
              value={dashboard.totalTransactions.toLocaleString()}
              icon="📊"
              color="text-green-600"
              change="Processed"
            />

            <DashboardCard
              title="Average Match"
              value={`${dashboard.averageMatch}%`}
              icon="🎯"
              color="text-yellow-500"
              change="Across Uploads"
            />

            <DashboardCard
              title="Needs Review"
              value={dashboard.unmatched.toLocaleString()}
              icon="⚠️"
              color="text-red-600"
              change="Unmatched Entries"
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