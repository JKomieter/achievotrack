import useSWR from "swr";
import { useUserId } from "../hooks/useUserId";
import fetcher from "./fetcher";


export default function getCart() {
    const userId = useUserId();
    const apiUrl = process.env.DEV_BACKEND_URL;
    const { data, error, isLoading, mutate } = useSWR(userId ? `${apiUrl}/getCart?userId=${userId}` : null, fetcher);
    return { data, error, isLoading, mutate };
}


