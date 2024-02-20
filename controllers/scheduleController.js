const { auth, db } = require("../config/firebase");
const { doc, addDoc, collection, getDocs, getDoc } = require("firebase/firestore");

module.exports.addSchedule = async (req, res) => {
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

}

module.exports.getSchedules = async (req, res) => {
    console.log("fetching....")
    try {
        const {userId} = req.query;
        const userCollection = collection(db, 'users'); 
        const userDoc = doc(userCollection, userId);
        const scheduleCollection = collection(userDoc, 'schedules');
        const schedulesSnapShot = await getDocs(scheduleCollection);
        const schedules = schedulesSnapShot.docs.map((d) => d.data());
        console.log(schedules)
        res.json(schedules)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}
