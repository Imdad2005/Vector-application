"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
  Tooltip,
} from "recharts"
import { useTheme } from "next-themes"

const performanceData = [
  { date: "Mon", power: 280, heartRate: 145, load: 85 },
  { date: "Tue", power: 295, heartRate: 152, load: 92 },
  { date: "Wed", power: 275, heartRate: 140, load: 78 },
  { date: "Thu", power: 310, heartRate: 158, load: 105 },
  { date: "Fri", power: 285, heartRate: 148, load: 88 },
  { date: "Sat", power: 320, heartRate: 162, load: 115 },
  { date: "Sun", power: 265, heartRate: 138, load: 72 },
]

const weeklyProgressData = [
  { week: "W1", completed: 85, planned: 100 },
  { week: "W2", completed: 92, planned: 100 },
  { week: "W3", completed: 78, planned: 100 },
  { week: "W4", completed: 95, planned: 100 },
  { week: "W5", completed: 88, planned: 100 },
  { week: "W6", completed: 97, planned: 100 },
]

export function PerformanceCharts() {
  const { theme } = useTheme();
  // Theme-aware colors
  const powerColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
  const heartRateColor = theme === 'dark' ? '#ef4444' : '#dc2626';
  const textColor = theme === 'dark' ? '#e5e7eb' : '#1f2937';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  // Tooltip styles
  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
    color: textColor,
    borderRadius: '4px',
    padding: '8px',
  };
  
  return (
    <div className="space-y-6">
      {/* Power & Heart Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Weekly Performance Trends</CardTitle>
          <CardDescription>Power output and heart rate patterns over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: powerColor }}></div>
              <span className="text-sm">Power (W)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: heartRateColor }}></div>
              <span className="text-sm">Heart Rate (bpm)</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: textColor }} 
                  axisLine={{ stroke: gridColor }} 
                  tickLine={{ stroke: gridColor }} 
                />
                <YAxis 
                  yAxisId="left" 
                  tick={{ fill: textColor }} 
                  axisLine={{ stroke: gridColor }} 
                  tickLine={{ stroke: gridColor }} 
                  domain={[0, 'dataMax + 50']}
                  label={{ 
                    value: 'Power (W)', 
                    angle: -90, 
                    position: 'insideLeft',
                    fill: textColor,
                    style: { textAnchor: 'middle' } 
                  }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tick={{ fill: textColor }} 
                  axisLine={{ stroke: gridColor }}
                  tickLine={{ stroke: gridColor }}
                  domain={[0, 'dataMax + 20']}
                  label={{ 
                    value: 'Heart Rate (bpm)', 
                    angle: 90, 
                    position: 'insideRight',
                    fill: textColor,
                    style: { textAnchor: 'middle' } 
                  }}
                />
                <Tooltip 
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: textColor, fontWeight: 'bold' }}
                  formatter={(value, name) => {
                    return [value, name === 'power' ? 'Power (W)' : 'Heart Rate (bpm)'];
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="power"
                  name="Power"
                  stroke={powerColor}
                  strokeWidth={3}
                  dot={{ fill: powerColor, strokeWidth: 2, r: 4, stroke: theme === 'dark' ? '#111827' : '#ffffff' }}
                  activeDot={{ r: 6, stroke: theme === 'dark' ? '#111827' : '#ffffff' }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="heartRate"
                  name="Heart Rate"
                  stroke={heartRateColor}
                  strokeWidth={3}
                  dot={{ fill: heartRateColor, strokeWidth: 2, r: 4, stroke: theme === 'dark' ? '#111827' : '#ffffff' }}
                  activeDot={{ r: 6, stroke: theme === 'dark' ? '#111827' : '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Training Load Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Training Load Distribution</CardTitle>
          <CardDescription>Daily training stress and recovery patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme === 'dark' ? '#8b5cf6' : '#7c3aed' }}></div>
            <span className="text-sm">Training Load</span>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke={gridColor} 
                />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: textColor }} 
                  axisLine={{ stroke: gridColor }} 
                  tickLine={{ stroke: gridColor }} 
                />
                <YAxis 
                  tick={{ fill: textColor }} 
                  axisLine={{ stroke: gridColor }} 
                  tickLine={{ stroke: gridColor }} 
                  label={{ 
                    value: 'Load Score', 
                    angle: -90, 
                    position: 'insideLeft',
                    fill: textColor,
                    style: { textAnchor: 'middle' } 
                  }}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: textColor, fontWeight: 'bold' }}
                  formatter={(value) => [`${value} units`, 'Training Load']}
                />
                <Area
                  type="monotone"
                  dataKey="load"
                  name="Training Load"
                  stroke={theme === 'dark' ? '#8b5cf6' : '#7c3aed'}
                  fill={theme === 'dark' ? '#8b5cf6' : '#7c3aed'}
                  fillOpacity={0.3}
                  strokeWidth={2}
                  activeDot={{ r: 6, stroke: theme === 'dark' ? '#111827' : '#ffffff' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Progress Bar Chart */}
      <Card>
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
          <div className="h-[250px]">
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
    </div>
  )
}
