const { collection, addDoc, doc, getDocs, getDoc } = require('firebase/firestore');
const { db, storage } = require("../config/firebase");
// const nodeFetch = require('node-fetch');
require('dotenv').config()
// const { createApi } = require('unsplash-js');
const { ref, uploadString } = require('firebase/storage');

// const unsplash = createApi({
//     accessKey: process.env.UNSPLASH_ACCESS_KEY,
//     fetch: nodeFetch,
// });
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
        console.log('body', req.body)
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        await addDoc(
            courseCollection, {
                course,
                schedules,
                instructor,
            }
        );
        const syllabusRef = ref(storage, `${userId}/syllabus/${course.name}`);
        await uploadString(syllabusRef, syllabus.base64String);
        res.status(200).json({ message: 'Succesfully added course' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.getCourses = async (req, res) => {
    try {
        const { userId } = req.query;
        console.log('getting courses', userId)
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const querySnapshot = await getDocs(courseCollection);
        const courses = [];
        querySnapshot.forEach((doc) => {
            courses.push({
                id: doc.id,
                ...doc.data()
            });
        });
        console.log('courses', courses);
        res.status(200).json(courses || []);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.getCourse = async (req, res) => {
    try {
        const { courseId, userId } = req.query;
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const courseDoc = doc(courseCollection, courseId);
        const courseSnapshot = await getDoc(courseDoc);
        const course = {
            id: courseSnapshot.id,
            ...courseSnapshot.data()
        };
        res.status(200).json(course)
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