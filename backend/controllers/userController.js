const { auth, db } = require("../config/firebase");
const { createUserWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { collection, addDoc, doc, setDoc } = require("firebase/firestore");

const checkIfStillLoggedIn = (req, res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) res.status(200).send({ user });
        else res.status(400).send({ error: "User not logged in" });
    });
};

module.exports.signup = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const usersCollection = collection(db, "users");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await addDoc(usersCollection, {
            email: email,
            username: username
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
        const { major, minor, year, userId } = req.body;
        const userDoc = doc(db, "users", userId);
        // add this information to the user's document in the database
        await setDoc(userDoc, {
            major: major,
            minor: minor,
            year: year
        }, { merge: true });

        res.status(200).send({ message: "Academic details added successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};