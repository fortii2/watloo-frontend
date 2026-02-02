import { useState } from "react";
import CourseView from "./components/CourseView";
import Header from "./components/Header";
import ViewSwitcher from "./components/ViewSwitcher";
import { mockCourses } from "./data/courses";

export default function App() {
  const [view, setView] = useState<'today' | 'week'>('today');

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 font-sans selection:bg-blue-100">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gray-50 shadow-2xl overflow-hidden">
        <Header />
        <CourseView view={view} courses={mockCourses} />
        <ViewSwitcher view={view} onViewChange={setView} />
      </div>
    </div>
  )
}
