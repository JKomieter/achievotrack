import useSWR from "swr";
import { useUserId } from "../hooks/useUserId";
import fetcher from "./fetcher";


export default function getWishlist() {
    const userId = useUserId();
    const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;
    const { data, error, isLoading, mutate } = useSWR(userId ? `${apiUrl}/getWishlist?userId=${userId}` : null, fetcher);
    return { data, error, isLoading, mutate };
}


