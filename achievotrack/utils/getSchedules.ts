import useSWR from 'swr'
import fetcher from './fetcher';
import { Schedule } from '../libs/types';
import { useUserId } from '../hooks/useUserId';

export default function getSchedules() {
    const apiUrl = process.env.EXPO_PUBLIC_DEV_BACKEND_URL;
    const userId = useUserId();
    const { data, error, isLoading, mutate } = useSWR(userId ? `${apiUrl}/getSchedules?userId=${userId}` : null, fetcher);
    const scheduleStats = data ? groupSchedules(data) : null;
    return { scheduleStats, data, error, mutate, isLoading };
}

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
