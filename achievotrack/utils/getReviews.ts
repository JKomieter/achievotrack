import useSWR from "swr";
import fetcher from "./fetcher";

export default function getReviews() {
    const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;
    const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/getReviews`, fetcher);
    return { data, error, isLoading, mutate };
}