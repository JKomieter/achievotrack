import useSWR from "swr";

export default function getCourse(courseId: string) {
    const apiUrl = process.env.DEV_BACKEND_URL;
    const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/getCourse?courseId=${courseId}`);
    console.log('course', data);
    return { data, error, isLoading, mutate };
}