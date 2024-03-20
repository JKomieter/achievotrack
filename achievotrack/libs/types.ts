export enum Action {
    ADD,
    EDIT,
}

export type time = {
    hours: number,
    minutes: number
}

export enum ScheduleType {
    HOMEWORK = 'Homework',
    EXAM = 'Exam',
    QUIZ = 'Quiz',
    PROJECT = 'Project'
}

export interface Schedule {
    id: string;
    task: string;
    date: Date;
    start_time: { hours: number, minutes: number };
    stop_time: { hours: number, minutes: number };
    scheduleType: string;
    courseId?: string;
}

export interface MarketItem {
    id: string,
    title: string,
    description: string,
    price: number,
    sellerName: string,
    category: 'string',
    createdAt: Date,
    sellerId: string,
    sellerEmail: string,
    sellerPhone: number,
    images: string[],
    keywords?: string[],
}

export interface Course {
    id: string;
    credit: string;
    instructor: { name: string, email: string };
    syllabus: { name: string, base64String: string };
    schedules: Schedule[];
    meetingTimes: CourseScheduleProps[]
    grades?: {
        homeworks: number[],
        quizzes: number[],
        exams: number[],
        projects: number[],
    },
    course: {
        name: string,
        description: string,
        credit: string
    }
    stats?: {
        avgHomeworkGrade: number,
        avgExamsGrade: number,
        avgQuizGrade: number,
        avgProjectGrade: number,
        averageScore: number,
        highestScore: number,
        lowestScore: number,
        currentGrade: string,
        scores?: number[],
    },
}

export interface User {
    achievements: string[],
    completed_tasks: number,
    grade: string,
    study_time: number,
    profile_pic: string,
    username: string,
    email: string,
    classes: number,
    tasks: number
}

export type CourseScheduleProps = {
    day: string,
    start_time: time,
    stop_time: time,
}