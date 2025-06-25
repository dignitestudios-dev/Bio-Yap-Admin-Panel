import React from "react";
import Chart from "./icons/Chart";

type DashboardFigureProps = {
  title: string;
  value: number | string;
};

const DashboardFigure: React.FC<DashboardFigureProps> = ({ title, value }) => {
  return (
    <div className="p-5 bg-white rounded-[20px] relative overflow-hidden">
      <h2 className="text-desc font-general-medium">{title}</h2>
      <p className="text-2xl text-black font-general-semibold">{value}</p>

      <div className="h-full flex items-center absolute right-0 top-0">
        <Chart />
      </div>
    </div>
  );
};

export default DashboardFigure;
