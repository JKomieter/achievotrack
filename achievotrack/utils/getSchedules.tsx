import useSWR from 'swr'
import fetcher from './fetcher';
import { Schedule } from '@/libs/types';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function getSchedules() {
    const apiUrl = process.env.DEV_BACKEND_URL;
    const userId = useUserId();
    const { data, error, isLoading, mutate } = useSWR(userId ? `${apiUrl}/getSchedules?userId=${userId}` : null, fetcher);
    const scheduleStats = data ? groupSchedules(data) : null;
    console.log('Schedules: ', data)
    return { scheduleStats, data, error, mutate, isLoading }
}

export const useUserId = () => {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserId = async () => {
            const id = await AsyncStorage.getItem('userId');
            setUserId(id);
        };

        fetchUserId();
    }, []);

    return userId;
};

const groupSchedules = (schedules: Schedule[]) => {
    let numHomeworks = 0;
    let numExams = 0;
    let numQuizzes = 0;
    let numProjects = 0;

    for (const sch of schedules) {
        switch (sch.scheduleType.toLowerCase()) {
            case 'homework':
                numHomeworks++;
                break;
            case 'project':
                numProjects++;
                break;
            case 'quiz':
                numQuizzes++;
                break;
            case 'exam':
                numExams++;
                break;
            default:
                break;
        }
    }

    return {
        numExams,
        numHomeworks,
        numProjects,
        numQuizzes
    }
}
