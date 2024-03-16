import useSWR from "swr";
import { useUserId } from "../hooks/useUserId";
import fetcher from "./fetcher";


export default function getUser() {
    const userId = useUserId();
    const apiUrl = process.env.DEV_BACKEND_URL;
    const { data, error, isLoading, mutate } = useSWR(userId ? `${apiUrl}/getUser?userId=${userId}` : null, fetcher);
    return { data, error, isLoading, mutate };
}