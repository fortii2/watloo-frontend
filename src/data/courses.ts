import type { CourseType } from "../types/CourseType";

const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        dates.push(date.toISOString().split('T')[0]); // "2026-02-03"
    }
    return dates;
};

const weekDates = getWeekDates();

export const mockCourses: CourseType[] = [
    {
        name: "ECE 650",
        location: "E7 3511",
        prof: "Duke Negotiat",
        beginTime: `${weekDates[0]}T09:00:00`,
        endTime: `${weekDates[0]}T10:20:00`
    },
    {
        name: "ECE 651",
        location: "E7 4501",
        prof: "Prof. Smith",
        beginTime: `${weekDates[0]}T10:30:00`,
        endTime: `${weekDates[0]}T11:50:00`
    },
    {
        name: "ECE 653",
        location: "E7 3511",
        prof: "Dr. Johnson",
        beginTime: `${weekDates[0]}T13:00:00`,
        endTime: `${weekDates[0]}T14:20:00`
    },
    {
        name: "CS 486",
        location: "MC 4020",
        prof: "Prof. Brown",
        beginTime: `${weekDates[1]}T08:30:00`,
        endTime: `${weekDates[1]}T09:50:00`
    },
    {
        name: "MATH 239",
        location: "MC 2017",
        prof: "Dr. Wilson",
        beginTime: `${weekDates[1]}T14:30:00`,
        endTime: `${weekDates[1]}T15:50:00`
    },
    {
        name: "ECE 650",
        location: "E7 3511",
        prof: "Duke Negotiat",
        beginTime: `${weekDates[2]}T09:00:00`,
        endTime: `${weekDates[2]}T10:20:00`
    },
    {
        name: "ECE 654",
        location: "E7 2104",
        prof: "Prof. Williams",
        beginTime: `${weekDates[2]}T14:30:00`,
        endTime: `${weekDates[2]}T15:50:00`
    },
    {
        name: "CS 486",
        location: "MC 4020",
        prof: "Prof. Brown",
        beginTime: `${weekDates[3]}T08:30:00`,
        endTime: `${weekDates[3]}T09:50:00`
    },
    {
        name: "ECE 651",
        location: "E7 4501",
        prof: "Prof. Smith",
        beginTime: `${weekDates[3]}T10:30:00`,
        endTime: `${weekDates[3]}T11:50:00`
    },
    {
        name: "MATH 239",
        location: "MC 2017",
        prof: "Dr. Wilson",
        beginTime: `${weekDates[4]}T10:00:00`,
        endTime: `${weekDates[4]}T11:20:00`
    },
    {
        name: "ECE 653",
        location: "E7 3511",
        prof: "Dr. Johnson",
        beginTime: `${weekDates[4]}T13:00:00`,
        endTime: `${weekDates[4]}T14:20:00`
    }
];
