const { auth, db } = require("../config/firebase");
const { createUserWithEmailAndPassword, onAuthStateChanged } = require("firebase/auth");
const { collection, addDoc } = require("firebase/firestore");

const checkIfStillLoggedIn = (req, res) => {
    onAuthStateChanged(auth, (user) => {
        if (user) res.status(200).send({ user });
        else res.status(400).send({ error: "User not logged in" });
    });
};

module.exports.signup = async (req, res) => {
    const { email, password, username } = req.body;
    const usersCollection = collection(db, "users");
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addDoc(usersCollection, {
            email: email,
            username: username
        })
        console.log(user);
        res.status(200).send({ user, username });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
};

