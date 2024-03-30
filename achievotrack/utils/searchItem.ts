import axios from "axios";
const API_URL = process.env.EXPO_PUBLIC_DEV_BACKEND_URL

export default async function searchItem(query: string) {
    const res = await axios.get(`${API_URL}/searchItem?searchQuery=${query}`);
    if (res.status !== 200) {
        return [];
    }
    return res.data;
}