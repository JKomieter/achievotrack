import { Action, ScheduleType } from "@/libs/types";
import axios from "axios";

const apiUrl = process.env.DEV_BACKEND_URL

export default class Schedule {
    title: string;
    date: Date;
    start_time: { hours: number, minutes: number };
    stop_time: { hours: number, minutes: number };
    scheduleType: string;
    action: Action;

    constructor(title: string, date: Date, start_time: { hours: number, minutes: number }, stop_time: { hours: number, minutes: number }, scheduleType: string, action: Action) {
        this.title = title;
        this.date = date;
        this.start_time = start_time;
        this.stop_time = stop_time;
        this.scheduleType = scheduleType;
        this.action = action;
    }

    async set() {
        if (this.action === Action.ADD) {
            const response = await axios.post(`${apiUrl}/addSchedule`, {
                title: this.title,
                date: this.date,
                start_time: this.start_time,
                stop_time: this.stop_time,
                scheduleType: this.scheduleType
            })

            return response.data;
        }
        const response = await axios.put(`${apiUrl}/editSchedule`, {
            title: this.title,
            date: this.date,
            start_time: this.start_time,
            stop_time: this.stop_time,
            scheduleType: this.scheduleType
        })

        return response.data;
    }
}