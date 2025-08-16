"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { useTheme } from "next-themes"

// Updated data with more sources
const dataSourcesData = [
  { name: "Vector Band", value: 65, color: "#3b82f6" },
  { name: "Mobile App", value: 25, color: "#10b981" },
  { name: "Manual Input", value: 10, color: "#f59e0b" }
]

const syncFrequencyData = [
  { day: "Mon", syncs: 12 },
  { day: "Tue", syncs: 15 },
  { day: "Wed", syncs: 8 },
  { day: "Thu", syncs: 18 },
  { day: "Fri", syncs: 14 },
  { day: "Sat", syncs: 10 },
  { day: "Sun", syncs: 6 },
]

// Helper function to get values for different metrics
const getMetricValue = (metric: string): string => {
  const values: Record<string, string> = {
    'Heart Rate': '68 bpm (resting)',
    'Steps': '8,742 today',
    'Sleep': '7h 12m last night',
    'Workouts': '3 this week',
    'GPS': 'Active',
    'Training Load': '78 (moderate)',
    'Recovery': '85% recovered',
    'HRV': '62 ms',
    'Strain': '12.4 (moderate)',
    'Blood Oxygen': '98%',
    'Temperature': '36.6°C'
  };
  return values[metric] || 'No data';
};

export function DeviceAnalytics() {
  const { theme } = useTheme();
  // Theme-aware colors
  const barColor = theme === 'dark' ? '#60a5fa' : '#3b82f6'; // Lighter blue in dark mode
  const textColor = theme === 'dark' ? '#e5e7eb' : '#1f2937'; // Light gray in dark mode, dark gray in light mode
  const tooltipStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #e5e7eb',
    color: textColor
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Analytics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Latest Metrics */}
        <div>
          <h4 className="font-medium mb-3">Latest Vector Band Metrics</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Heart Rate', 'Steps', 'Sleep', 'HRV', 'Recovery', 'Strain'].map((metric) => (
              <div key={metric} className="border p-2 rounded-md">
                <p className="text-xs text-muted-foreground">{metric}</p>
                <p className="font-medium">{getMetricValue(metric)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div>
          <h4 className="font-medium mb-3">Data Sources</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={dataSourcesData} 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={30} 
                  outerRadius={60} 
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {dataSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value}%`, 'Data Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sync Frequency */}
        <div>
          <h4 className="font-medium mb-3">Weekly Sync Activity</h4>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={syncFrequencyData}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: textColor }}
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: textColor }} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${value} syncs`, 'Frequency']}
                />
                <Bar 
                  dataKey="syncs" 
                  fill={barColor} 
                  radius={[4, 4, 0, 0]} 
                  label={{ 
                    position: 'top', 
                    fill: textColor, 
                    fontSize: 10,
                    formatter: (value) => value
                  }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
