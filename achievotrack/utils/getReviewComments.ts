import useSWR from "swr";
import fetcher from "./fetcher";

export default function getReviewComments(reviewId: string) {
    const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;
    const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/getReviewComments?reviewId=${reviewId}`, fetcher);
    return { data, error, isLoading, mutate };
}