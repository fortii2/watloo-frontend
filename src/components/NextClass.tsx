import type { CourseType } from "../types/CourseType";

export default function NextClass({ courses }: { courses: CourseType[] }) {
    const toDateTime = (course: CourseType, time: string) => new Date(`${course.date}T${time}:00`);

    const sortedCourses = [...courses].sort((a, b) => {
        const aStart = toDateTime(a, a.beginTime).getTime();
        const bStart = toDateTime(b, b.beginTime).getTime();
        return aStart - bStart;
    });

    const now = new Date();
    const current = sortedCourses.find((course) => {
        const start = toDateTime(course, course.beginTime);
        const end = toDateTime(course, course.endTime);
        return now >= start && now < end;
    });
    const upcoming = sortedCourses.find((course) => toDateTime(course, course.beginTime) >= now);
    const selected = current ?? upcoming ?? sortedCourses[0];

    const { name, location, professor, beginTime, endTime, date } = selected || {};

    const formatTime = (time?: string) => time ?? '';

    const calculateRemainTime = () => {
        if (!selected || !date || !beginTime || !endTime) {
            return { text: '0 min', label: 'Starts in' };
        }
        const start = new Date(`${date}T${beginTime}:00`);
        const end = new Date(`${date}T${endTime}:00`);

        if (now >= start && now < end) {
            const diffMs = end.getTime() - now.getTime();
            const diffMinutes = Math.round(diffMs / 1000 / 60);

            if (diffMinutes >= 60) {
                const hours = Math.floor(diffMinutes / 60);
                const mins = diffMinutes % 60;
                return {
                    text: mins > 0 ? `${hours}h ${mins}min` : `${hours}h`,
                    label: 'Ends in'
                };
            }
            return { text: `${diffMinutes} min`, label: 'Ends in' };
        } else {
            const diffMs = start.getTime() - now.getTime();
            const diffMinutes = Math.round(diffMs / 1000 / 60);

            if (diffMinutes >= 60) {
                const hours = Math.floor(diffMinutes / 60);
                const mins = diffMinutes % 60;
                return {
                    text: mins > 0 ? `${hours}h ${mins}min` : `${hours}h`,
                    label: 'Starts in'
                };
            }
            return { text: diffMinutes > 0 ? `${diffMinutes} min` : 'Starting soon', label: 'Starts in' };
        }
    };

    const { text: remainTime, label: timeLabel } = calculateRemainTime();

    return (
        <div className="h-[35vh] min-h-70 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center px-4 py-3">
                <div className="
                py-2 px-4
                text-xs font-bold text-white uppercase
                bg-white/20 backdrop-blur-sm rounded-full 
                tracking-wider">
                    <span>Next Class</span>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <div className="text-xl font-bold text-white">{formatTime(beginTime)}</div>
                    <div className="text-xs text-blue-100">Begin Time</div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 py-4">
                <h2 className="text-4xl font-bold text-white mb-3 mt-6">{name}</h2>
                <p className="text-blue-50 text-sm mb-2">📍 {location}</p>
                <p className="text-blue-50 text-sm">👨‍🏫 {professor}</p>
            </div>

            <div className="border-t border-white/20 px-6 py-4 flex items-center justify-center">
                <span className="text-sm text-blue-100">{timeLabel}</span>
                <span className="text-lg font-bold text-white ml-2">{remainTime}</span>
            </div>
        </div >
    )
}