const { db } = require("../config/firebase");
const { doc, addDoc, collection, getDocs, getDoc, updateDoc, deleteDoc, query, where, increment } = require("firebase/firestore");

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
            completed: false
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

module.exports.getSchedules = async (req, res) => {
    console.log('getting...')
    try {
        const { userId } = req.query;
        const userCollection = collection(db, 'users');
        const userDoc = doc(userCollection, userId);
        const courseCollection = collection(userDoc, 'courses')
        const courseQuerySnapshot = await getDocs(courseCollection);
        const schedules = [];

        for (const courseDoc of courseQuerySnapshot.docs) {
            const scheduleCollection = collection(courseDoc.ref, 'schedules');
            const q = query(scheduleCollection, where("completed", "==", false));
            const scheduleQuerySnapshot = await getDocs(q);
            for (const scheduleDoc of scheduleQuerySnapshot.docs) {
                schedules.push({ id: scheduleDoc.id, ...scheduleDoc.data(), courseId: courseDoc.id });
            }
        }

        await updateDoc(userDoc, { tasks: schedules.length }, { merge: true });
        res.json(schedules);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
}

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
        res.status(400).json({ error: error.message })
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