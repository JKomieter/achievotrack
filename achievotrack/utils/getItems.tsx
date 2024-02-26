import useSWR from "swr";
import { useUserId } from "./useUserId";
import fetcher from "./fetcher";


export default function getItems() {
    const userId = useUserId();
    const apiUrl = process.env.DEV_BACKEND_URL;
    const { data, error, isLoading, mutate } = useSWR(userId ? `${apiUrl}/getItems` : null, fetcher);
    console.log('market', data)
    return { data, error, isLoading, mutate };
}   


