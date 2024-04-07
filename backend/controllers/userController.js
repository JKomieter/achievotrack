const { auth, db } = require("../config/firebase");
const { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { collection, addDoc, doc, setDoc, getDoc, getDocs, where, query, updateDoc } = require("firebase/firestore");

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
            email: email.toLowerCase(),
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
        const { userId } = req.query;
        console.log('userId ', userId);
        const userDoc = doc(usersCollection, userId);
        const userRef = await getDoc(userDoc);
        const userData = userRef.data();
        const courseCollection = collection(userDoc, 'courses');
        const courseRef = await getDocs(courseCollection);
        const numClasses = courseRef.docs.length;
        const data = {
            achievements: userData.achievements,
            completed_tasks: userData.completed_tasks,
            grade: userData.grade,
            study_time: userData.study_time,
            profile_pic: userData.profile_pic,
            username: userData.username,
            email: userData.email,
            classes: numClasses,
            tasks: userData.tasks
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            res.status(200).send({ email: user.email, username: userDoc.data().username, userId: userDoc.id });
        } else { 
            res.status(200).send({ message: "No user found with this email" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Something went wrong. Please try again." });
    }
}

module.exports.logout = async (req, res) => {
    try {
        await signOut(auth);
        console.log('User logged out successfully');
        res.status(200).send({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        console.log('User logged out successfully');
        res.status(400).send({ error: error.message });
    }
}

module.exports.savePushToken = async (req, res) => {
    try {
        const { userId, pushToken } = req.body;
        const userDoc = doc(usersCollection, userId);
        await setDoc(userDoc, {
            pushToken
        }, { merge: true });
        res.status(200).send({ message: "Push token saved successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Something went wrong" });
    }
}

module.exports.updateProfilePic = async (req, res) => {
    try {
        const { profile_pic, userId } = req.body;
        const userDoc = doc(usersCollection, userId);
        await updateDoc(userDoc, { profile_pic }, { merge: true });
        res.status(200).send({ message: "Successfully changed profile pic" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Something went wrong" });
    }
}

module.exports.updateProfilePic = async (req, res) => {
    try {
        const { profile_pic, userId } = req.body;
        console.log('changing profile pic')
        const userDoc = doc(usersCollection, userId);
        await updateDoc(userDoc, { profile_pic }, { merge: true });
        res.status(200).send({ message: "Successfully changed profile pic" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Something went wrong" });
    }
}
