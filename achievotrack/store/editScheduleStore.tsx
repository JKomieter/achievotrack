import { create } from "zustand";
import { Action, ScheduleType } from "@/libs/types";

interface scheduleStore {
    title: string,
    date: Date,
    start_time: { hours: number, minutes: number },
    stop_time: { hours: number, minutes: number },
    scheduleType: ScheduleType,
    action: Action
    setDetails: (
        title: string,
        date: Date,
        start_time: { hours: number, minutes: number },
        stop_time: { hours: number, minutes: number },
        scheduleType: ScheduleType.HOMEWORK,
        action: Action
    ) => void
}

const useScheduleStore = create<scheduleStore>((set) => ({
    title: "",
    date: new Date,
    start_time: { hours: 0, minutes: 0 },
    stop_time: { hours: 0, minutes: 0 },
    scheduleType: ScheduleType.HOMEWORK,
    action: Action.ADD,
    setDetails: (title, date, start_time, stop_time, scheduleType, action) => set({ title, date, start_time, stop_time, scheduleType, action })
}))

export default useScheduleStore;