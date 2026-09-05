import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import DashboardCard from "../components/DashboardCard";
import RecentActivity from "../components/RecentActivity";

import { getDashboard } from "../services/dashboardService";
import { useAuth } from "../context/AuthContext";
import { useGuestData } from "../context/GuestDataContext";

const IconFolder = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const IconBarChart = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconTarget = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconAlertTriangle = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

function Dashboard() {

  const { isGuest } = useAuth();
  const { guestHistory } = useGuestData();

  const [dashboard, setDashboard] = useState({
    totalUploads: 0,
    totalTransactions: 0,
    matched: 0,
    unmatched: 0,
    averageMatch: 0,
  });

  useEffect(() => {

    if (isGuest) {

      const totalTransactions = guestHistory.reduce((s, i) => s + i.totalTransactions, 0);
      const matched = guestHistory.reduce((s, i) => s + i.matched, 0);
      const unmatched = guestHistory.reduce((s, i) => s + i.unmatched, 0);

      setDashboard({
        totalUploads: guestHistory.length,
        totalTransactions,
        matched,
        unmatched,
        averageMatch: totalTransactions
          ? Math.round((matched / totalTransactions) * 100)
          : 0,
      });

    } else {
      loadDashboard();
    }

  }, [isGuest, guestHistory]);

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

          {isGuest && (
            <div className="bg-[#fe2e4b]/10 border border-[#fe2e4b]/30 text-[#fe2e4b] text-sm rounded-xl px-4 py-3 mb-6">
              You're browsing as a Guest — nothing is saved. Data disappears on refresh or logout.{" "}
              <Link to="/register" className="underline font-semibold">Create an account</Link> to keep it.
            </div>
          )}

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
              icon={<IconFolder />}
              color="text-white"
              change="Reconciliations"
            />

            <DashboardCard
              title="Transactions"
              value={dashboard.totalTransactions.toLocaleString()}
              icon={<IconBarChart />}
              color="text-[#4ADE80]"
              change="Processed"
            />

            <DashboardCard
              title="Average Match"
              value={`${dashboard.averageMatch}%`}
              icon={<IconTarget />}
              color="text-[#FBBF24]"
              change="Across Uploads"
            />

            <DashboardCard
              title="Needs Review"
              value={dashboard.unmatched.toLocaleString()}
              icon={<IconAlertTriangle />}
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