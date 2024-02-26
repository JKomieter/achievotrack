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
    title: string;
    date: Date;
    start_time: { hours: number, minutes: number };
    stop_time: { hours: number, minutes: number };
    scheduleType: string;
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