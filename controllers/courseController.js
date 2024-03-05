const { collection, addDoc, doc, getDocs, getDoc } = require('firebase/firestore');
const { db } = require("../config/firebase");

const usersCollection = collection(db, 'users');
const courseCollection = doc(usersCollection, 'courses');

module.exports.addCourse = async (req, res) => {
    try {
        const { courseName, instructor, syllabus, schedule, credits } = req.body;
        await addDoc(
            courseCollection, {
                courseName,
                instructor,
                syllabus,
                schedule,
                credits,   
            }
        );        

        res.status(200).json({ message: 'Succesfully added course' })
    } catch (error) { 
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.getCourses = async (req, res) => {
    try {
        const querySnapshot = await getDocs(courseCollection);
        const courses = [];
        querySnapshot.forEach((doc) => {
            courses.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.getCourse = async (req, res) => {
    try {
        const { courseId } = req.query;
        const docRef = doc(courseCollection, courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            res.status(200).json({ id: docSnap.id, ...docSnap.data() });
        } else {
            res.status(400).json({ error: "No such document" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
}

module.exports.addScoreToCourse = async (req, res) => {
    try {
        const { id, score, type } = req.body;
        const courseDofRef = doc(courseCollection, id);
        const scoreTypeCollection = collection(courseDofRef, type);
        await addDoc(scoreTypeCollection, { score });
        res.status(200).json({ message: 'Succesfully added score' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
}