const { db } = require("../config/firebase");
const { doc, addDoc, collection, getDocs, getDoc, updateDoc, deleteDoc, query, where, increment } = require("firebase/firestore");
const { Expo } = require('expo-server-sdk');
require('dotenv').config();
const cron = require('node-cron');
const moment = require('moment');

let expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
    useFcmV1: false
});

module.exports.addSchedule = async (req, res) => {
    console.log('adding...')
    try {
        const { userId, task, date, start_time, stop_time, scheduleType, courseId } = req.body;
        console.log(req.body)
        const userDoc = doc(db, "users", userId);
        const courseCollection = collection(userDoc, "courses");
        const courseDoc = doc(courseCollection, courseId);
        if (!(await getDoc(courseDoc)).exists()) {
            res.status(400).json({ error: "Course does not exist" });
            return;
        }
        const scheduleCollection = collection(courseDoc, "schedules")
        await addDoc(scheduleCollection, {
            task,
            date,
            start_time,
            stop_time,
            scheduleType,
            completed: false,
            sent: false
        })

        res.status(200).json({ message: "Successfully added schedule" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.updateSchedule = async (req, res) => {
    console.log('updating...')
    try {
        const { id, userId, task, date, start_time, stop_time, scheduleType, courseId } = req.body;
        const userCollection = collection(db, 'users');
        const userDoc = doc(userCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const courseDoc = doc(courseCollection, courseId);
        const scheduleCollection = collection(courseDoc, 'schedules');
        const scheduleDoc = doc(scheduleCollection, id);
        await updateDoc(scheduleDoc, {
            task,
            date,
            start_time,
            stop_time,
            scheduleType,
            completed: false
        })

        res.status(200).json({ message: "Successfully updated schedule" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

async function sendPushNotification(pushToken, task, startDate) {
    const message = {
        to: pushToken,
        sound: 'default',
        title: task,
        body: `You have a task to do by ${startDate.toLocaleTimeString()}`
    };
    const result = await expo.sendPushNotificationsAsync([message]);
    console.log('Push notification result:', result);

    return result;
}

module.exports.getSchedules = async (req, res) => {
    try {
        const { userId } = req.query;

        // Retrieve user document
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }
        const userData = userDocSnap.data();
        const userPushToken = userData.pushToken;
        console.log('pushToken: ', userPushToken)
        // Retrieve schedules for each course
        const schedules = [];
        const courseDocsSnapshot = await getDocs(collection(userDocRef, 'courses'));
        for (const courseDoc of courseDocsSnapshot.docs) {
            const scheduleDocsSnapshot = await getDocs(collection(courseDoc.ref, 'schedules'));
            for (const scheduleDoc of scheduleDocsSnapshot.docs) {
                const scheduleData = scheduleDoc.data();
                schedules.push({ id: scheduleDoc.id, ...scheduleData, courseId: courseDoc.id });
                // if (!scheduleData.completed && !scheduleData.sent) {
                    const startDate = moment(scheduleData.date)
                        .hours(scheduleData.start_time.hours)
                        .minutes(scheduleData.start_time.minutes);
                    // if (startDate > new Date()) {
                        // Schedule push notification
                        const notificationTime = startDate.clone().subtract(1, 'hour');
                        // cron.schedule(notificationTime.format('mm HH * * *'), async () => {
                            // console.log('Scheduling push notification for:', scheduleData.task);
                            try {
                                const tickets = await sendPushNotification(userPushToken.data, scheduleData.task, new Date(startDate));
                                let receiptIds = [];
                                for (let ticket of tickets) {
                                    // NOTE: Not all tickets have IDs; for example, tickets for notifications
                                    // that could not be enqueued will have error information and no receipt ID.
                                    if (ticket.id) {
                                        receiptIds.push(ticket.id);
                                    }
                                }
                                let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
                                for (let chunk of receiptIdChunks) {
                                    setTimeout(async () => {
                                        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
                                        console.log('receipts: ', receipts);
                                    }, 5000); // Delay of 5 seconds
                                }
                                await updateDoc(scheduleDoc.ref, { sent: true }, { merge: true });
                            } catch (error) {
                                console.error('Failed to send push notification:', error);
                            }
                        // });
                    // }
                // }
            }
        }

        // Update user document with the total number of schedules
        await updateDoc(userDocRef, { tasks: schedules.length }, { merge: true });
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.deleteSchedule = async (req, res) => {
    console.log('deleting...')
    try {
        const { scheduleId, userId, courseId } = req.body;
        const userCollection = collection(db, 'users');
        const userDoc = doc(userCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const courseDoc = doc(courseCollection, courseId);
        const scheduleCollection = collection(courseDoc, 'schedules');
        const scheduleDoc = doc(scheduleCollection, scheduleId);
        await deleteDoc(scheduleDoc);
        res.status(200).json({ message: "Successfully deleted schedule" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error })
    }
}


module.exports.markAsDone = async (req, res) => {
    try {
        const { scheduleId, userId, courseId } = req.body;
        const userCollection = collection(db, 'users');
        const userDoc = doc(userCollection, userId);
        await updateDoc(userDoc, {
            completed_tasks: increment(1)
        }, { merge: true });
        const courseCollection = collection(userDoc, 'courses');
        const courseDoc = doc(courseCollection, courseId);
        const scheduleCollection = collection(courseDoc, 'schedules');
        const scheduleDoc = doc(scheduleCollection, scheduleId);
        await updateDoc(scheduleDoc, {
            completed: true
        }, { merge: true })
        res.status(200).json({ message: "Successfully completed task" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
}