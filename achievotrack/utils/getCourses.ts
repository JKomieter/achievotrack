import useSWR from "swr";

export default function getCourses() {
    const apiUrl = process.env.DEV_BACKEND_URL;
    const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/getCourses`);
    console.log('courses', data);
    return { data, error, isLoading, mutate };
}