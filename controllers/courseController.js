const { collection, addDoc, doc, getDocs, getDoc } = require('firebase/firestore');
const { db, storage } = require("../config/firebase");
require('dotenv').config()
const { ref, uploadString } = require('firebase/storage');
const usersCollection = collection(db, 'users');

const structureCourseData = (scores = []) => {
    let homeworkTotal = 0;
    let examsTotal = 0;
    let quizTotal = 0;
    let projectTotal = 0;
    let homeworkCount = 0;
    let examsCount = 0;
    let quizCount = 0;
    let projectCount = 0;
    let currentGrade;
    let count = 0

    for (const score of scores) {
        const data = score.data()
        switch (data.type) {
            case 'homework':
                homeworkTotal += data.score;
                homeworkCount++;
                break;
            case 'exams':
                examsTotal += data.score;
                examsCount++;
                break;
            case 'quiz':
                quizTotal += data.score;
                quizCount++;
                break;
            case 'project':
                projectTotal += data.score;
                projectCount++;
                break;
            default:
                break;
        }
    }
    
    let avgHomeworkGrade = homeworkCount ? (homeworkTotal / homeworkCount) : 0;
    let avgExamsGrade = examsCount ? (examsTotal / examsCount) : 0;
    let avgQuizGrade = quizCount ? (quizTotal / quizCount) : 0;
    let avgProjectGrade = projectCount ? (projectTotal / projectCount) : 0;

    if (avgHomeworkGrade) count++;
    if (avgExamsGrade) count++;
    if (avgProjectGrade) count++;
    if (avgQuizGrade) count++

    let averageScore = (avgHomeworkGrade + avgExamsGrade + avgProjectGrade + avgQuizGrade) / count;
    if (averageScore >= 94) {
        currentGrade = 'A';
    } else if (averageScore >= 90) {
        currentGrade = 'B+';
    } else if (averageScore >= 85) {
        currentGrade = 'B';
    } else if (averageScore >= 80) {
        currentGrade = 'C+';
    } else if (averageScore >= 75) {
        currentGrade = 'C';
    } else if (averageScore >= 70) {
        currentGrade = 'D';
    } else {
        currentGrade = 'E';
    }

    let highestScore = Math.max(
        avgHomeworkGrade,
        avgExamsGrade,
        avgQuizGrade,
        avgProjectGrade,
    )
    let lowestScore = Math.min(
        avgHomeworkGrade,
        avgExamsGrade,
        avgQuizGrade,
        avgProjectGrade,
    );
    
    return {
        avgHomeworkGrade,
        avgExamsGrade,
        avgQuizGrade,
        avgProjectGrade,
        averageScore,
        highestScore,
        lowestScore,
        currentGrade,
    }
}

module.exports.addCourse = async (req, res) => {
    try {
        const {
            course,
            instructor,
            syllabus,
            schedules,
            userId
        } = req.body;
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
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const querySnapshot = await getDocs(courseCollection);
        const courses = [];
        for (const doc of querySnapshot.docs) {
            const scheduleCollection = collection(doc.ref, 'schedules');
            const schedulesSnapShot = await getDocs(scheduleCollection)
            const schedules = [];
            for (const sch of schedulesSnapShot.docs) {
                schedules.push(
                    {
                        id: sch.id,
                        ...sch.data()
                    }
                )
            }
            const scoresCollection = collection(doc.ref, 'scores');
            const scores = await getDocs(scoresCollection);
            const stats = structureCourseData(scores.docs)
            courses.push({
                id: doc.id,
                ...doc.data(), // DO NOT change the args positions
                schedules,
                stats,
            });
        }
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
        const scoresCollection = collection(courseDoc, 'scores')
        const scores = await getDocs(scoresCollection)
        const scheduleCollection = collection(courseDoc, 'schedules')
        const schedulesSnapShot = await getDocs(scheduleCollection)
        const stats = structureCourseData(scores.docs)
        
        const schedules = [];
        for (const sch of schedulesSnapShot.docs) {
            schedules.push(
                {
                    id: sch.id,
                    ...sch.data()
                }
            )
        }
        console.log(schedules)
        const course = {
            id: courseSnapshot.id,
            stats,
            ...courseSnapshot.data(), // DO NOT change the args positions
            schedules,
        };
        
        res.status(200).json(course)
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
}

module.exports.addScoreToCourse = async (req, res) => {
    try {
        const { score, type, courseId, userId } = req.body
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const courseDoc = doc(courseCollection, courseId);
        const scoreCollection = collection(courseDoc, 'scores');
        await addDoc(
            scoreCollection, {
            score,
            type,
            createdAt: new Date()
        }
        )
        res.status(200).json({ message: 'Succesfully added score' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
}