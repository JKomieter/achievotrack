const { auth, db } = require("../config/firebase");
const { doc, setDoc } = require("firebase/firestore");

module.exports.addSchedule = async (req, res) => {
    try {
        const { userId, title, date, start_time, stop_time, hasStarted, course } = req.body;
        const userDoc = doc(db, "users", userId);
        await setDoc(userDoc, {
            title,
            date,
            start_time,
            stop_time,
            hasStarted,
            course
        });

        res.status(200).json({message: "Successfully added schedule"});
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.updateSchedule = async (req, res) => {

}