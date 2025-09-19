'use client';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, PieProps } from 'recharts';

interface PieData {
  name: string;
  value: number;
  color: string;
}

// এখানে PieProps.data expects ChartDataInput[]
interface CompanyDistributionChartProps {
  data: PieData[];
}

export default function CompanyDistributionChart({ data }: CompanyDistributionChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4">Company Distribution</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data as any} 
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-gray-500">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
