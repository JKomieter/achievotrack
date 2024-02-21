import { Action } from "@/libs/types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const apiUrl = process.env.DEV_BACKEND_URL

export default class Schedule {
    id: string;
    title: string;
    date: Date;
    start_time: { hours: number, minutes: number };
    stop_time: { hours: number, minutes: number };
    scheduleType: string;
    action: Action;

    constructor(id: string, title: string, date: Date, start_time: { hours: number, minutes: number }, stop_time: { hours: number, minutes: number }, scheduleType: string, action: Action) {
        this.id = id
        this.title = title;
        this.date = date;
        this.start_time = start_time;
        this.stop_time = stop_time;
        this.scheduleType = scheduleType;
        this.action = action;
    }

    async set() {
        const userId = await AsyncStorage.getItem("userId")
        if (this.action === Action.ADD) {
            const response = await axios.post(`${apiUrl}/addSchedule`, {
                userId: userId,
                title: this.title,
                date: this.date,
                start_time: this.start_time,
                stop_time: this.stop_time,
                scheduleType: this.scheduleType
            })

            return response.data;
        }

        const response = await axios.post(`${apiUrl}/updateSchedule`, {
            id: this.id,
            userId: userId,
            title: this.title,
            date: this.date,
            start_time: this.start_time,
            stop_time: this.stop_time,
            scheduleType: this.scheduleType.toLowerCase()
        })

        return response.data;
    }
}