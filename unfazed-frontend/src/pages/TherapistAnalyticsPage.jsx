import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import RevenueChart from "../components/analytics/RevenueChart";
import UpgradeModal from "../components/common/UpgradeModal";
import useEntitlement from "../hooks/useEntitlement";

export const TherapistAnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const { upgradeModalOpen, setUpgradeModalOpen, blockedFeature, checkEntitlement } = useEntitlement();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axiosInstance.get("/analytics/dashboard");
        setAnalyticsData(res.data);
      } catch (err) {
        if (err.response?.status === 403) {
          checkEntitlement("view_advanced_analytics");
        }
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Practice Business Analytics</h1>
          <p className="text-xs text-gray-500">MongoDB Aggregation Pipeline: Revenue Trends, Active Clients & No-Show Rates</p>
        </div>
      </div>

      <RevenueChart analyticsData={analyticsData} />

      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        blockedFeature={blockedFeature}
      />
    </div>
  );
};

export default TherapistAnalyticsPage;
