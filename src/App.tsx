import { useState, useEffect } from "react";

import CourseView from "./components/CourseView";
import Header from "./components/Header";
import ViewSwitcher from "./components/ViewSwitcher";
import { buildApiUrl, extractApiError } from "./lib/api";
import type { CourseType } from "./types/CourseType";

type View = "today" | "week";

interface CoursesResponse {
  view: "day" | "week";
  timezone: string;
  courses: CourseType[];
}

export default function App() {
  const [view, setView] = useState<View>('today');

  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const requestView = view === "today" ? "day" : "week";
        const requestUrl = buildApiUrl("/api/courses", { view: requestView });

        const res = await fetch(requestUrl, {
          headers: {
            "X-Telegram-User-Id": "246806391"
          },
        });

        if (!res.ok) {
          throw new Error(await extractApiError(res));
        }

        const data = (await res.json()) as CoursesResponse;
        const nextCourses = Array.isArray(data.courses) ? data.courses : [];

        if (!cancelled) setCourses(nextCourses);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError("Something went wrong")
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [view]);

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 font-sans selection:bg-blue-100">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-gray-50 shadow-2xl overflow-hidden">
        <Header />

        {loading && <div className="p-4">Loading...</div>}
        {error && <div className="p-4 text-red-600">Error: {error}</div>}

        {!loading && !error && (
          <CourseView view={view} courses={courses} />
        )}

        <ViewSwitcher view={view} onViewChange={setView} />
      </div>
    </div>
  );
}
