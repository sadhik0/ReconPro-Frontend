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

    <div className="min-h-screen bg-[linear-gradient(135deg,#0f0e0e_0%,#4a0d14_45%,#0f0e0e_100%)] text-white">

      <Sidebar />

      <div className="ml-64">

        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-2">
            ReconPro
          </h1>

          <p className="text-white/60 mb-8">
            Welcome to ReconPro
          </p>

          <div className="grid grid-cols-4 gap-6">

            <DashboardCard
              title="Total Uploads"
              value={dashboard.totalUploads}
              icon="📁"
              color="text-white"
              change="Reconciliations"
            />

            <DashboardCard
              title="Transactions"
              value={dashboard.totalTransactions.toLocaleString()}
              icon="📊"
              color="text-[#4ADE80]"
              change="Processed"
            />

            <DashboardCard
              title="Average Match"
              value={`${dashboard.averageMatch}%`}
              icon="🎯"
              color="text-[#FBBF24]"
              change="Across Uploads"
            />

            <DashboardCard
              title="Needs Review"
              value={dashboard.unmatched.toLocaleString()}
              icon="⚠️"
              color="text-[#fe2e4b]"
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