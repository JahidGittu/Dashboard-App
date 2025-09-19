'use client';

import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

interface UserActivityChartProps {
  data: { month: string; users: number }[];
}

export default function UserActivityChart({ data }: UserActivityChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow h-80">
      <h3 className="text-lg font-semibold mb-4">User Activity (Random)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="users" fill="#ff63c4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
