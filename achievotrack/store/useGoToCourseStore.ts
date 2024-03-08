import { create } from "zustand";

interface CourseStore {
    courseId: string,
    courseName: string,
    setCourseId: (courseId: string) => void,
    setCourseName: (courseName: string) => void,
}

const useGoToCourseStore = create<CourseStore>((set) => ({
    courseId: '',
    courseName: '',
    setCourseId: (courseId) => set({courseId}),
    setCourseName: (courseName) => set({courseName})
}))

export default useGoToCourseStore;