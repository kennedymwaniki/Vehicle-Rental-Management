// BarGraph.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// import { BarChartData } from "./types";

export interface BarChartData {
  name: string;
  value: number;
}

interface BarGraphProps {
  data: BarChartData[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  return (
    <div className="flex justify-center mt-4">
      <BarChart
        width={500}
        height={480}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default BarGraph;
