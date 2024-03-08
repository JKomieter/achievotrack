import { CourseScheduleProps } from "@/app/addCourse";

export enum Action {
    ADD,
    EDIT,
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
}

export interface Course {
    id: string;
    credit: string;
    instructor: { name: string, email: string };
    syllabus: { name: string, base64String: string };
    schedules: CourseScheduleProps[];
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
}