import type { CourseType } from "../types/CourseType";

interface WeekViewProps {
    courses: CourseType[];
}

export default function WeekView({ courses }: WeekViewProps) {

    const groupedCourses = courses.reduce((acc, course) => {
        const date = course.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(course);
        return acc;
    }, {} as Record<string, CourseType[]>);

    const sortedDates = Object.keys(groupedCourses).sort();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const weekday = weekdays[date.getDay()];
        return `${month} ${day}, ${weekday}`;
    };

    const formatTime = (time: string) => time;

    return (
        <div className="space-y-6 pb-20">
            {sortedDates.map((date) => (
                <div key={date}>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 sticky top-0 bg-gray-50 py-2">
                        {formatDate(date)}
                    </h3>
                    <div className="space-y-3">
                        {groupedCourses[date].map((course) => (
                            <div
                                key={course.id}
                                className="bg-white border border-blue-100 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-semibold text-gray-900 text-lg">{course.name}</h4>
                                    <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full">
                                        {course.professor}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                                    <div className="flex items-center gap-1">
                                        <span>🕐</span>
                                        <span>{formatTime(course.beginTime)} - {formatTime(course.endTime)}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>📍</span>
                                        <span>{course.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
