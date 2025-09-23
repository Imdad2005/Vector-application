"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"
import { useTheme } from "next-themes"

const weeklyProgressData = [
  { week: "W1", completed: 85, planned: 100 },
  { week: "W2", completed: 92, planned: 100 },
  { week: "W3", completed: 78, planned: 100 },
  { week: "W4", completed: 95, planned: 100 },
  { week: "W5", completed: 88, planned: 100 },
  { week: "W6", completed: 97, planned: 100 },
]

export function WeeklyGoalChart() {
  const { theme } = useTheme();
  
  // Theme-aware colors
  const textColor = theme === 'dark' ? '#e5e7eb' : '#1f2937';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  // Tooltip styles
  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
    borderRadius: '8px',
    color: textColor,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-heading">Weekly Goal Progress</CardTitle>
        <CardDescription>Completed vs planned training sessions over the last 6 weeks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme === 'dark' ? '#22c55e' : '#16a34a' }}></div>
            <span className="text-sm">Completed (%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(22, 163, 74, 0.3)' }}></div>
            <span className="text-sm">Planned (%)</span>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={weeklyProgressData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke={gridColor} 
              />
              <XAxis 
                dataKey="week" 
                tick={{ fill: textColor }} 
                axisLine={{ stroke: gridColor }} 
                tickLine={{ stroke: gridColor }} 
              />
              <YAxis 
                tick={{ fill: textColor }} 
                axisLine={{ stroke: gridColor }} 
                tickLine={{ stroke: gridColor }} 
                domain={[0, 100]}
                label={{ 
                  value: 'Completion (%)', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: textColor,
                  style: { textAnchor: 'middle' } 
                }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: textColor, fontWeight: 'bold' }}
                formatter={(value, name) => [`${value}%`, name === 'completed' ? 'Completed' : 'Planned']}
              />
              <Legend 
                verticalAlign="top" 
                wrapperStyle={{ paddingBottom: '10px' }} 
              />
              <Bar 
                dataKey="planned" 
                name="Planned"
                fill={theme === 'dark' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(22, 163, 74, 0.3)'} 
                radius={[4, 4, 0, 0]} 
                stackId="a"
              />
              <Bar 
                dataKey="completed" 
                name="Completed" 
                fill={theme === 'dark' ? '#22c55e' : '#16a34a'} 
                radius={[4, 4, 0, 0]} 
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}