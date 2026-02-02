import type { CourseType } from "../types/CourseType"

export default function CourseList({ courses }: { courses: CourseType[] }) {
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className="space-y-3">
            {courses.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    <p>No more classes today</p>
                </div>
            ) : (
                courses.map((course, index) => (
                    <div
                        key={index}
                        className="bg-white border border-blue-100 rounded-xl p-4 hover:shadow-lg hover:border-blue-200 transition-all"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg">{course.name}</h3>
                            <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full">
                                {course.prof}
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
                ))
            )}
        </div>
    )
}
