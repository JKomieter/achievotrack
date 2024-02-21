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
    title: string,
    description: string,
    price: number,
    sellerName: string,
    type: string,
    subject: 'string',
    createdAt: Date,
    sellerEmail: string,
    sellerNumber: number,
    imageSrc: string[]
}