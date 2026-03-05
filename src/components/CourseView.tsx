import type { CourseType } from "../types/CourseType";
import NextClass from "./NextClass"
import CourseList from "./CourseList"
import WeekView from "./WeekView"

export default function CourseView({ view, courses }: { view: string, courses: CourseType[] }) {
    const today = new Date().toISOString().split('T')[0];
    const todayCourses = courses
        .filter((c) => c.date === today)
        .sort((a, b) => a.beginTime.localeCompare(b.beginTime));

    return (
        <div className="flex-1 overflow-y-auto px-6 pt-2 pb-32 bg-gray-50">
            {view === 'today' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    <section className="h-[35vh] min-h-70">
                        <NextClass courses={todayCourses.length > 0 ? todayCourses : courses} />
                    </section>

                    <section>
                        <CourseList courses={todayCourses.slice(1)} />
                    </section>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <WeekView courses={courses} />
                </div>
            )}
        </div>
    )
}