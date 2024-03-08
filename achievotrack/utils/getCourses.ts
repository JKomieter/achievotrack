import useSWR from "swr";
import { useUserId } from "@/hooks/useUserId";
import fetcher from "./fetcher";

export default function getCourses() {
    const apiUrl = process.env.DEV_BACKEND_URL;
    const userId = useUserId()
    const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/getCourses?userId=${userId}`, fetcher);
    console.log('courses', data);
    return { data, error, isLoading, mutate };
}