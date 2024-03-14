const { auth, db } = require("../config/firebase");
const { createUserWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { collection, addDoc, doc, setDoc, getDoc } = require("firebase/firestore");

const usersCollection = collection(db, "users");

const checkIfStillLoggedIn = (req, res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) res.status(200).send({ user });
        else res.status(400).send({ error: "User not logged in" });
    });
};

module.exports.signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await addDoc(usersCollection, {
            email: email,
            username: username,
            completed_tasks: 0,
            achievements: [],
            grade: '',
            study_time: 0
        })
        console.log(user);
        res.status(200).send({ user, username, userId: userDoc.id });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};

module.exports.addAcademicDetails = async (req, res) => {
    try {
        const { major, minor, year, userId, profile_pic } = req.body;
        const userDoc = doc(db, "users", userId);
        await setDoc(userDoc, {
            major,
            minor,
            year,
            profile_pic
        }, { merge: true });

        res.status(200).send({ message: "Academic details added successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const userDoc = doc(usersCollection, userId);
        const userRef = await getDoc(userDoc);
        const userData = userRef.data();
        const data = {
            achievements: userData.achievements,
            completed_tasks: userData.completed_tasks,
            grade: userData.grade,
            study_time: userData.study_time,
            profile_pic: userData.profile_pic,
        }
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
}