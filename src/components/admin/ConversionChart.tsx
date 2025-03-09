
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
  { name: '01/10', value: 2.1 },
  { name: '05/10', value: 3.5 },
  { name: '10/10', value: 2.8 },
  { name: '15/10', value: 4.2 },
  { name: '20/10', value: 3.9 },
  { name: '25/10', value: 3.2 },
  { name: '30/10', value: 3.4 },
];

const ConversionChart: React.FC = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <YAxis 
            stroke="#9e9e9e" 
            fontSize={12} 
            tickFormatter={(value) => `${value}%`}
            domain={[0, 5]} 
          />
          <Tooltip 
            formatter={(value) => [`${value}%`, 'Taux de conversion']}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: 'none'
            }}
          />
          <Bar 
            dataKey="value" 
            fill="#9E76ED" 
            radius={[4, 4, 0, 0]} 
            barSize={35}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionChart;
