import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { Action } from './types';

const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL

export default class Schedule {
    id: string;
    task: string;
    date: Date;
    start_time: { hours: number, minutes: number };
    stop_time: { hours: number, minutes: number };
    scheduleType: string;
    courseId: string;
    action: Action;

    constructor(id: string, task: string, date: Date, start_time: { hours: number, minutes: number }, stop_time: { hours: number, minutes: number }, scheduleType: string, courseId: string, action: Action) {
        this.id = id
        this.task = task;
        this.date = date;
        this.start_time = start_time;
        this.stop_time = stop_time;
        this.scheduleType = scheduleType;
        this.courseId = courseId;
        this.action = action;
    }

    async set() {
        const userId = await AsyncStorage.getItem("userId")
        if (this.action === 0) {
            const response = await axios.post(`${API_URL}/addSchedule`, {
                userId: userId,
                task: this.task,
                date: this.date,
                start_time: this.start_time,
                stop_time: this.stop_time,
                courseId: this.courseId as string,
                scheduleType: this.scheduleType
            })
            return response.data;
        }

        const response = await axios.post(`${API_URL}/updateSchedule`, {
            id: this.id,
            userId: userId,
            task: this.task,
            date: this.date,
            start_time: this.start_time,
            stop_time: this.stop_time,
            courseId: this.courseId,
            scheduleType: this.scheduleType.toLowerCase()
        })
        console.log(response)
        return response.data;
    }
}