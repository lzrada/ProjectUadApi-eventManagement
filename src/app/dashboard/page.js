"use client";
import DraggableCalendar from "./components/ui/DraggableCalender";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <DraggableCalendar />
    </div>
  );
}
