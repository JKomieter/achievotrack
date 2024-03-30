import { create } from "zustand";

interface reviewStore {
    reviewId: string,
    setReviewId: (reviewId: string) => void
}

const useCommentStore = create<reviewStore>((set) => ({
    reviewId: '',
    setReviewId: (reviewId) => set({reviewId}),
}))

export default useCommentStore;