export interface CourseType {
    id: string,
    name: string,
    location: string,
    professor: string,
    dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7,
    date: string,
    beginTime: string,
    endTime: string
}