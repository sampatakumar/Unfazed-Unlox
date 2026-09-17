import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, AlertTriangle, DollarSign } from "lucide-react";

export const RevenueChart = ({ analyticsData }) => {
  const data = analyticsData?.monthlyRevenue || [
    { month: "May", gross: 32000, net: 28800 },
    { month: "Jun", gross: 45000, net: 40500 },
    { month: "Jul", gross: 58000, net: 52200 },
    { month: "Aug", gross: 72000, net: 64800 },
    { month: "Sep", gross: 84000, net: 75600 },
  ];

  const pieData = analyticsData?.sessionBreakdown || [
    { name: "Completed", value: 42, fill: "#0F766E" },
    { name: "Scheduled", value: 14, fill: "#0D9488" },
    { name: "No-Show", value: 3, fill: "#E11D48" },
    { name: "Cancelled", value: 4, fill: "#9CA3AF" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Net Practice Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">₹{(analyticsData?.totalNetRevenue || 261900).toLocaleString("en-IN")}</div>
          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Active Clients</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analyticsData?.activeClientsCount || 28} Clients</div>
          <div className="text-xs text-blue-600 font-semibold">Tier Cap: 100 Clients (PRO)</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>No-Show Rate</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">{analyticsData?.noShowRate || "4.6%"}</div>
          <div className="text-xs text-emerald-600 font-semibold">Industry Avg: 12.0% (Well below)</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>Average Session Rate</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">₹1,650 / hr</div>
          <div className="text-xs text-gray-500">Individual & Couples Combined</div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-gray-900 text-base">Monthly Revenue Trend (MongoDB Aggregation)</h4>
              <p className="text-xs text-gray-500">Gross vs Net earnings processed through platform</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-800 rounded-full border border-teal-100">
              MongoDB Pipeline
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F766E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0F766E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                <YAxis tickLine={false} axisLine={false} style={{ fontSize: "12px" }} />
                <Tooltip />
                <Area type="monotone" dataKey="net" stroke="#0F766E" strokeWidth={3} fillOpacity={1} fill="url(#colorNet)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Session Status Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs space-y-4">
          <div>
            <h4 className="font-bold text-gray-900 text-base">Session Breakdown</h4>
            <p className="text-xs text-gray-500">Attendance & completion stats</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.fill }}></span>
                <span className="text-gray-600 truncate">{item.name}: <strong>{item.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
