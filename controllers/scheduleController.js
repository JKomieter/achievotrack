const { auth, db } = require("../config/firebase");
const { doc, addDoc, collection, getDocs, getDoc, updateDoc, deleteDoc } = require("firebase/firestore");

module.exports.addSchedule = async (req, res) => {
    console.log('adding...')
    try {
        const { userId, title, date, start_time, stop_time, scheduleType } = req.body;
        const userDoc = doc(db, "users", userId);
        const scheduleCollection = collection(userDoc, "schedules")
        await addDoc(scheduleCollection, {
            title,
            date,
            start_time,
            stop_time,
            scheduleType
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
        const { id, userId, title, date, start_time, stop_time, scheduleType } = req.body;
        const userCollection = collection(db, 'users');
        const userDoc = doc(userCollection, userId);
        const scheduleCollection = collection(userDoc, 'schedules');
        const scheduleDoc = doc(scheduleCollection, id);
        await updateDoc(scheduleDoc, {
            title, 
            date, 
            start_time, 
            stop_time, 
            scheduleType
        })

        res.status(200).json({message: "Successfully updated schedule"})
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

module.exports.getSchedules = async (req, res) => {
    console.log('getting...')
    try {
        const { userId } = req.query;
        const userCollection = collection(db, 'users'); 
        const userDoc = doc(userCollection, userId);
        const scheduleCollection = collection(userDoc, 'schedules');
        const schedulesSnapShot = await getDocs(scheduleCollection);
        const schedules = [];
        for (const sch of schedulesSnapShot.docs) {
            schedules.push({id: sch.id, ...sch.data()})
        }
        console.log(schedules)
        res.json(schedules)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

module.exports.deleteSchedule = async (req, res) => {
    console.log('deleting...')
    try {
        const { scheduleId, userId } = req.body;
        const userCollection = collection(db, 'users');
        const userDoc = doc(userCollection, userId);
        const scheduleCollection = collection(userDoc, 'schedules');
        const scheduleDoc = doc(scheduleCollection, scheduleId);
        await deleteDoc(scheduleDoc);
        res.status(200).json({message: "Successfully deleted schedule"})
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}