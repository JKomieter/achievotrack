const { collection, addDoc, doc, getDocs, getDoc } = require('firebase/firestore');
const { db, storage } = require("../config/firebase");
const nodeFetch = require('node-fetch');
require('dotenv').config()
const { createApi } = require('unsplash-js');
const { ref } = require('firebase/storage');

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    fetch: nodeFetch,
});
const usersCollection = collection(db, 'users');


module.exports.addCourse = async (req, res) => {
    try {
        const {
            course,
            instructor,
            syllabus,
            schedules,
            userId
        } = req.body;
        // const splashes = await unsplash.search.getPhotos({
        //     query: course.name,
        //     page: 1,
        //     perPage: 1
        // });
        // const imageUrl = splashes
        const syllabusRef = syllabusRef = ref(storage, `syllabus/${course.name}`);
        await uploadString(cont, syllabus, '');
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        await addDoc(
            courseCollection, {
                course,
                schedules,
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