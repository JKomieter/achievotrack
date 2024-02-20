import useSWR from 'swr'
import fetcher from './fetcher';
import { Schedule } from '@/libs/types';

export default function getSchedules() {
    const apiUrl = process.env.DEV_BACKEND_URL;
    const hardCodedID = 'J1npTsJaWO9XSBk5To7C'
    const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/getSchedules?userId=${hardCodedID}`, fetcher);
    const scheduleStats = data ? groupSchedules(data) : null; 
    console.log('Schedules: ', data)
    return { scheduleStats, data, error, mutate, isLoading }
}


const groupSchedules = (schedules: Schedule[]) => {
    let numHomeworks = 0;
    let numExams = 0;
    let numQuizzes = 0;
    let numProjects = 0;

    for (const sch of schedules) {
        switch (sch.scheduleType) {
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
