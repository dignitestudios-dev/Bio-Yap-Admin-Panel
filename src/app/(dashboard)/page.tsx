"use client";
import React, { useEffect, useState } from "react";
import DashboardFigure from "@/components/DashboardFigure";
import Cookies from "js-cookie";
import TotalUsersChart from "@/components/charts/TotalUsersChart";
import SubscriptionSalesChart from "@/components/charts/SubscriptionSalesChart";
import { analyticsHooks } from "@/hooks/useAnalyticsRequests";
import PageLoader from "@/components/PageLoader";

const Dashboard = () => {
  const { loading, analytics, getUserGrowthAnalytics } =
    analyticsHooks.useUserGrowthAnalytics();
  const currentYear = new Date().getFullYear().toString();
  const [admin, setAdmin] = useState({
    name: "",
    profileImage: "",
  });

  useEffect(() => {
    const adminData = Cookies.get("admin");
    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      setAdmin({
        name: parsedAdmin.name || "Admin",
        profileImage: parsedAdmin.profileImage || "/images/profile-img.png",
      });
    }
  }, []);

  useEffect(() => {
    // Get current year's data by default
    getUserGrowthAnalytics(currentYear, currentYear);
  }, []);

  return (
    <>
      {/* {loading ? (
        <PageLoader />
      ) : (
        <> */}
      <div>
        <p className="text-desc">Hello {admin?.name || "Admin"},</p>
        <h1 className="section-heading">Welcome to Dashboard</h1>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <DashboardFigure
          title="Total Users"
          value={analytics.totalActiveUsers}
        />
        {/* <DashboardFigure title="Total Products" value={1140} />
        <DashboardFigure title="Total Product Sales" value={5489} />
        <DashboardFigure title="Total Sales Revenue" value={`$${5400}`} /> */}
      </div>
      {/* <div className="p-4 bg-white rounded-2xl">
        <SubscriptionSalesChart />
      </div> */}

      <div className="p-4 bg-white rounded-2xl">
        <TotalUsersChart
          loading={loading}
          data={analytics.userGrowthData}
          onDateChange={getUserGrowthAnalytics}
          defaultYear={currentYear}
        />
      </div>
      {/* </>
      )} */}
    </>
  );
};

export default Dashboard;
