import useSWR from "swr";
import fetcher from "./fetcher";
import { useUserId } from "../hooks/useUserId";

export default function getCourse(courseId: string) {
    const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;
    const userId = useUserId()
    const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/getCourse?courseId=${courseId}&userId=${userId}`, fetcher);
    return { data, error, isLoading, mutate };
}                   