export function formatDate(date: Date | any) {
    try {
        // Parse the date string into a Date object
        const parsedDate = new Date(date);

        // Check if the parsedDate is a valid Date object
        if (isNaN(parsedDate.getTime())) {
            throw new Error('Invalid date string');
        }

        const year = parsedDate.getFullYear();
        const month = parsedDate.getMonth() + 1;
        const day = parsedDate.getDate();

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

        return formattedDate;
    } catch (error) {
        console.error('Error formatting date:', error);
        return ''; // Return empty string or handle error as needed
    }
}



export function convertTo12HourFormat(time: {hours: number, minutes: number}) {
    const period = time.hours >= 12 ? 'PM' : 'AM';

    let hours12 = time.hours % 12;
    if (hours12 === 0) {
        hours12 = 12; 
    }

    const formattedTime = `${hours12}:${time.minutes < 10 ? '0' : ''}${time.minutes}${period}`;

    return formattedTime;
}