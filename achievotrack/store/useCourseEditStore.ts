import { CourseScheduleProps } from "@/libs/types";
import { create } from "zustand";

interface EditStore {
    id: string,
    instructor: { 
        name: string, 
        email: string 
    }
    syllabus: {
        name: string,
        base64String: string
    }
    course: {
        name: string,
        description: string,
        credit: string
    },
    meetingTimes: CourseScheduleProps[]
    setCourseStore: (
        id: string,
        instructor: { 
            name: string, 
            email: string 
        },
        syllabus: { 
            name: string, 
            base64String: string 
        },
        course: {
            name: string,
            description: string,
            credit: string
        },
        meetingTimes: CourseScheduleProps[]
    ) => void
}

const useCourseEditStore = create<EditStore>((set) => ({
    id: '',
    instructor: { name: '', email: '' },
    syllabus: { name: '', base64String: '' },
    course: {
        name: '',
        description: '',
        credit: ''
    },
    meetingTimes: [],
    setCourseStore: (id, instructor, syllabus, course, meetingTimes) => set({
        id,
        instructor,
        syllabus,
        course,
        meetingTimes
    }),
}))

export default useCourseEditStore;