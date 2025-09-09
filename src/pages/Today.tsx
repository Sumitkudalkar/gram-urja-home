import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sun, Wind, TrendingUp } from "lucide-react";

interface TodayData {
  user_name: string;
  today_savings_rupees: number;
  solar_today_kwh: number;
  wind_today_kwh: number;
}

interface TodayProps {
  onNavigateToWeekly: () => void;
}

const Today = ({ onNavigateToWeekly }: TodayProps) => {
  const [todayData, setTodayData] = useState<TodayData | null>(null);

  useEffect(() => {
    // Mock API call - in real app, this would be: fetch('/api/v1/home/{house_id}/today')
    const mockData: TodayData = {
      user_name: "Sunil",
      today_savings_rupees: 52,
      solar_today_kwh: 4.5,
      wind_today_kwh: 2.1
    };
    
    setTimeout(() => setTodayData(mockData), 500);
  }, []);

  if (!todayData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl font-medium text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with greeting */}
      <div className="bg-primary text-primary-foreground px-6 py-8">
        <h1 className="text-2xl font-semibold mb-2">
          {getGreeting()}, {todayData.user_name}
        </h1>
        <p className="text-primary-foreground/80 text-lg">
          Here's your energy summary for today
        </p>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Main savings display */}
        <Card className="p-8 text-center bg-success text-success-foreground shadow-lg">
          <div className="mb-4">
            <TrendingUp className="w-12 h-12 mx-auto mb-4" />
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium opacity-90">Money Saved Today</p>
            <div className="text-5xl font-bold">₹{todayData.today_savings_rupees}</div>
          </div>
        </Card>

        {/* Energy generation cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Power Generated Today
          </h2>
          
          {/* Solar card */}
          <Card className="p-6 bg-primary text-primary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Sun className="w-8 h-8" />
                <div>
                  <p className="text-lg font-medium">Power from Sun</p>
                  <p className="text-2xl font-bold">{todayData.solar_today_kwh} kWh</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Wind card */}
          <Card className="p-6 bg-wind text-wind-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Wind className="w-8 h-8" />
                <div>
                  <p className="text-lg font-medium">Power from Wind</p>
                  <p className="text-2xl font-bold">{todayData.wind_today_kwh} kWh</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation button */}
        <div className="pt-8">
          <Button
            onClick={onNavigateToWeekly}
            size="lg"
            className="w-full h-14 text-lg font-semibold"
          >
            View Weekly Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Today;