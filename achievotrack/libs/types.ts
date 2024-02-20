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
    title: string;
    date: Date;
    start_time: { hours: number, minutes: number };
    stop_time: { hours: number, minutes: number };
    scheduleType: string;
}