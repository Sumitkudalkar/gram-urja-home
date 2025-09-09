import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ArrowLeft, Calendar } from "lucide-react";

interface WeeklyDataPoint {
  day: string;
  kwh: number;
  type: "actual" | "predicted";
}

interface WeeklyReportData {
  weekly_data: WeeklyDataPoint[];
  summary_message: string;
}

interface WeeklyReportProps {
  onNavigateToToday: () => void;
}

const WeeklyReport = ({ onNavigateToToday }: WeeklyReportProps) => {
  const [weeklyData, setWeeklyData] = useState<WeeklyReportData | null>(null);

  useEffect(() => {
    // Mock API call - in real app, this would be: fetch('/api/v1/home/{house_id}/weekly_report')
    const mockData: WeeklyReportData = {
      weekly_data: [
        { day: "Mon", kwh: 4.2, type: "actual" },
        { day: "Tue", kwh: 6.1, type: "actual" },
        { day: "Wed", kwh: 5.3, type: "actual" },
        { day: "Thu", kwh: 5.5, type: "predicted" },
        { day: "Fri", kwh: 5.8, type: "predicted" }
      ],
      summary_message: "You used the most power on Tuesday. We predict you will use about 5.5 units tomorrow."
    };
    
    setTimeout(() => setWeeklyData(mockData), 500);
  }, []);

  if (!weeklyData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl font-medium text-muted-foreground">Loading weekly report...</div>
      </div>
    );
  }

  // Transform data for chart with proper colors
  const chartData = weeklyData.weekly_data.map(item => ({
    ...item,
    fill: item.type === "predicted" ? "hsl(var(--muted))" : "hsl(var(--primary))"
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 py-6">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNavigateToToday}
            className="text-primary-foreground hover:bg-primary-foreground/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Calendar className="w-6 h-6" />
          <h1 className="text-2xl font-semibold">Your Weekly Power Usage</h1>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Chart Card */}
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Units Used This Week (kWh)
            </h2>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded"></div>
                <span className="text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted border-2 border-muted-foreground rounded"></div>
                <span className="text-muted-foreground">Predicted</span>
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 14, fill: "hsl(var(--muted-foreground))" }}
                  label={{ value: 'Units (kWh)', angle: -90, position: 'insideLeft' }}
                />
                <Bar 
                  dataKey="kwh" 
                  radius={[4, 4, 0, 0]}
                  fill="hsl(var(--primary))"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Card */}
        <Card className="p-6 bg-secondary">
          <h3 className="text-lg font-semibold text-secondary-foreground mb-3">
            Weekly Summary
          </h3>
          <p className="text-secondary-foreground text-base leading-relaxed">
            {weeklyData.summary_message}
          </p>
        </Card>

        {/* Back button */}
        <div className="pt-4">
          <Button
            onClick={onNavigateToToday}
            variant="outline"
            size="lg"
            className="w-full h-14 text-lg font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Today's View
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;