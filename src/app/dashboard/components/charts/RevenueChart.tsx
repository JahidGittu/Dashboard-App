'use client';

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';

interface RevenueChartProps {
  data: { month: string; revenue: number }[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow h-80">
      <h3 className="text-lg font-semibold mb-4">Posts Revenue (Simulated)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#646cff" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
