
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: '01/10', value: 120 },
  { name: '05/10', value: 180 },
  { name: '10/10', value: 150 },
  { name: '15/10', value: 280 },
  { name: '20/10', value: 250 },
  { name: '25/10', value: 300 },
  { name: '30/10', value: 340 },
];

const SalesChart: React.FC = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#9e9e9e" fontSize={12} tickMargin={10} />
          <YAxis stroke="#9e9e9e" fontSize={12} tickFormatter={(value) => `${value}€`} />
          <Tooltip 
            formatter={(value) => [`${value}€`, 'Revenus']}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#F57DBD" 
            fill="#F57DBD" 
            fillOpacity={0.2} 
            activeDot={{ r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
