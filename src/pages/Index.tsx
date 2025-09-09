import { useState } from "react";
import Today from "./Today";
import WeeklyReport from "./WeeklyReport";

const Index = () => {
  const [currentView, setCurrentView] = useState<"today" | "weekly">("today");

  const navigateToWeekly = () => setCurrentView("weekly");
  const navigateToToday = () => setCurrentView("today");

  if (currentView === "weekly") {
    return <WeeklyReport onNavigateToToday={navigateToToday} />;
  }

  return <Today onNavigateToWeekly={navigateToWeekly} />;
};

export default Index;
