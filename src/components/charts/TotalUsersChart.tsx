"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "rc-select/assets/index.css";
import { analyticsHooks } from "@/hooks/useAnalyticsRequests";
import { toast } from "react-toastify";

interface TotalUsersChartProps {
  loading?: boolean;
  data: { year: string; users: number }[];
  onDateChange: (startDate: string, endDate: string) => void;
  defaultYear: string;
}

export default function TotalUsersChart({
  loading,
  data,
  onDateChange,
  defaultYear,
}: TotalUsersChartProps) {
  const { analytics, getUserGrowthAnalytics } =
    analyticsHooks.useUserGrowthAnalytics();
  // Generate last 10 years including current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 10 },
    (_, i) => (currentYear - i).toString()
  );
  const [startYear, setStartYear] = React.useState<string>(defaultYear);
  const [endYear, setEndYear] = React.useState<string>(defaultYear);

  useEffect(() => {
    if (startYear && endYear) {
      const startDate = `${startYear}-01-01`;
      const endDate = `${endYear}-12-31`;
      onDateChange(startDate, endDate);
    }
  }, [startYear, endYear]);

  const handleStartYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setStartYear(year);
    if (parseInt(year) > parseInt(endYear)) {
      setEndYear(year);
    }
  };

  const handleEndYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setEndYear(year);
    if (parseInt(year) < parseInt(startYear)) {
      setStartYear(year);
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between items-center pb-3 border-b border-[#2121211C]">
        <h2 className="text-dark text-2xl font-general-semibold">
          Total Users
        </h2>
        <div className="flex flex-wrap justify-end items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">From:</p>
            <select
              value={startYear}
              onChange={handleStartYearChange}
              className="w-[120px] border border-gray-300 rounded-md shadow-sm focus:border-green-400 focus:ring-2 focus:ring-green-200 px-2 py-1"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">To:</p>
            <select
              value={endYear}
              onChange={handleEndYearChange}
              className="w-[120px] border border-gray-300 rounded-md shadow-sm focus:border-green-400 focus:ring-2 focus:ring-green-200 px-2 py-1"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-[4px] bg-[#CAFF8A]"></div>
          <span className="text-sm">User</span>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barCategoryGap={32}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="year"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              domain={[0, "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                } else if (value >= 1000) {
                  return `${(value / 1000).toFixed(0)}K`;
                }
                return value;
              }}
            />
            <Tooltip
              formatter={(value) => {
                if (Number(value) >= 1000000) {
                  return [`${(Number(value) / 1000000).toFixed(1)}M`, "Users"];
                }
                return [value, "Users"];
              }}
            />
            <Bar dataKey="users" fill="#C0F765" radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
