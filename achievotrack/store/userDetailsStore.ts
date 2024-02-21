import { create } from "zustand";

interface userDetails {
    username: string;
    email: string;
    userId: string;
    setUserDetails: (username: string, email: string, userId: string) => void
}


const userDetailsStore = create<userDetails>((set) => ({
    username: '',
    email: '',
    userId: '',
    setUserDetails: (username, email, userId) => set({ username, email, userId })
}))


export default userDetailsStore;