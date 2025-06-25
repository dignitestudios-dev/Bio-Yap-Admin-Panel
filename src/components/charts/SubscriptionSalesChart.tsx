"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { DatePicker } from "@/components/ui/date-picker";

export default function SubscriptionSalesChart() {
  const subscriptionSalesData = [
    { month: "JAN", monthly: 100, yearly: 800 },
    { month: "FEB", monthly: 5000, yearly: 2000 },
    { month: "MAR", monthly: 15000, yearly: 3000 },
    { month: "APR", monthly: 12000, yearly: 2500 },
    { month: "MAY", monthly: 6000, yearly: 8000 },
    { month: "JUN", monthly: 2000, yearly: 12000 },
    { month: "JUL", monthly: 8000, yearly: 1000 },
    { month: "AUG", monthly: 15000, yearly: 3000 },
    { month: "SEP", monthly: 24000, yearly: 8000 },
    { month: "OCT", monthly: 18000, yearly: 10000 },
    { month: "NOV", monthly: 6000, yearly: 10000 },
    { month: "DEC", monthly: 12000, yearly: 12000 },
  ];

  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(Date.now() - 86400000 * 365)
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(Date.now())
  );

  return (
    <div className="space-y-4">
      <div className="w-full flex justify-between items-center pb-3 border-b border-[#2121211C]">
        <h2 className="text-dark text-2xl font-general-semibold">
          Subscription Sales Overview
        </h2>

        <div className="flex flex-wrap justify-end gap-2">
          <DatePicker
            date={startDate}
            onSelect={setStartDate}
            className="w-[150px] border rounded-md"
          />
          <DatePicker
            date={endDate}
            onSelect={setEndDate}
            className="w-[150px] border rounded-md"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-[4px] bg-[#CAFF8A]"></div>
          <span className="text-sm">Monthly Plan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-[4px] bg-[#D6455D]"></div>
          <span className="text-sm">Yearly Plan</span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={subscriptionSalesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
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
                const val = Number(value);
                if (val >= 1_000_000) {
                  return [`${(val / 1_000_000).toFixed(1)}M`, ""];
                } else if (val >= 1000) {
                  return [`${(val / 1000).toFixed(0)}K`, ""];
                }
                return [val, ""];
              }}
            />

            <Line
              type="monotone"
              dataKey="monthly"
              stroke="#C0F765"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#C0F765" }}
            />
            <Line
              type="monotone"
              dataKey="yearly"
              stroke="#C31736"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: "#C31736" }}
            />

            {/* Reference dots for key points */}
            <ReferenceDot
              x="JUN"
              y={12000}
              r={8}
              fill="#D6455D"
              stroke="none"
              label={{
                value: "12K",
                position: "top",
                fill: "black",
                fontSize: 12,
              }}
            />
            <ReferenceDot
              x="SEP"
              y={24000}
              r={8}
              fill="#CAFF8A"
              stroke="none"
              label={{
                value: "24K",
                position: "top",
                fill: "black",
                fontSize: 12,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
