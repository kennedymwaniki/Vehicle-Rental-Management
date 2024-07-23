import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface TotalReportsProps {
  data: Array<{ name: string; value: number }>;
}

const TotalReports: React.FC<TotalReportsProps> = ({ data }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-5 text-center">System Overview</h2>
      <BarChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TotalReports;
