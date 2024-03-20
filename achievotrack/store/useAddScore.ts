import { create } from "zustand";

interface AddScoreStore {
    courseId: string | undefined,
    setCourseId: (courseId: string | undefined) => void,
}

const useAddScoreStore = create<AddScoreStore>((set) => ({
    courseId: '',
    setCourseId: (courseId) => set({courseId}),
}))

export default useAddScoreStore;