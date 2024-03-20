const { collection, addDoc, doc, getDocs, getDoc, updateDoc, setDoc, deleteDoc } = require('firebase/firestore');
const { db, storage } = require("../config/firebase");
require('dotenv').config()
const { ref, uploadString } = require('firebase/storage');
const usersCollection = collection(db, 'users');

const calculateGrade = (averageScore) => {
    if (averageScore >= 94) {
        return 'A';
    } else if (averageScore >= 90) {
        return 'B+';
    } else if (averageScore >= 85) {
        return 'B';
    } else if (averageScore >= 80) {
        return 'C+';
    } else if (averageScore >= 75) {
        return 'C';
    } else if (averageScore >= 70) {
        return 'D';
    } else {
        return 'E';
    }

}

const structureCourseData = (scores = []) => {
    let homeworkTotal = 0;
    let examsTotal = 0;
    let quizTotal = 0;
    let projectTotal = 0;
    let homeworkCount = 0;
    let examsCount = 0;
    let quizCount = 0;
    let projectCount = 0;
    let count = 0;
    const scoresList = [...scores].sort((a, b) => a.data().createdAt - b.data().createdAt).map(score => score.data().score);
    for (const score of scores) {
        const data = score.data();
        switch (data.type) {
            case 'homework':
                homeworkTotal += data.score;
                homeworkCount++;
                break;
            case 'exam':
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

    const avgHomeworkGrade = homeworkCount ? (homeworkTotal / homeworkCount) : 0;
    const avgExamsGrade = examsCount ? (examsTotal / examsCount) : 0;
    const avgQuizGrade = quizCount ? (quizTotal / quizCount) : 0;
    const avgProjectGrade = projectCount ? (projectTotal / projectCount) : 0;

    if (avgHomeworkGrade) count++;
    if (avgExamsGrade) count++;
    if (avgProjectGrade) count++;
    if (avgQuizGrade) count++

    const averageScore = (avgHomeworkGrade + avgExamsGrade + avgProjectGrade + avgQuizGrade) / count;
    const currentGrade = calculateGrade(averageScore);

    const highestScore = Math.max(
        avgHomeworkGrade,
        avgExamsGrade,
        avgQuizGrade,
        avgProjectGrade,
    )
    const lowestScore = Math.min(
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
        scores: scoresList,
    }
}

module.exports.addCourse = async (req, res) => {
    try {
        const {
            course,
            instructor,
            syllabus,
            meetingTimes,
            userId
        } = req.body;
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        await addDoc(
            courseCollection, {
            course,
            meetingTimes,
            instructor,
        }
        );
        console.log(syllabus);
        if (syllabus !== null) {
            const syllabusRef = ref(storage, `${userId}/syllabus/${course.name}`);
            await uploadString(syllabusRef, syllabus.base64String);
        }

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
        let totalGrade = 0;
        let courseCount = 0;
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
            const { averageScore } = stats;
            totalGrade += averageScore;
            courseCount++;
            courses.push({
                id: doc.id,
                ...doc.data(), // DO NOT change the args positions
                schedules,
                stats,
            });
        }

        const overallGrade = totalGrade / courseCount;
        const grade = calculateGrade(overallGrade);
        await setDoc(userDoc, { grade: grade }, { merge: true });
        res.status(200).json(courses || []);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}

module.exports.getCourse = async (req, res) => {
    try {
        const { courseId, userId } = req.query;
        if (!userId) {
            res.status(400).json({ error: "userId is required" });
            return;
        }
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const courseDoc = doc(courseCollection, courseId);
        const courseSnapshot = await getDoc(courseDoc);
        const scoresCollection = collection(courseDoc, 'scores')
        const scores = await getDocs(scoresCollection)
        const stats = structureCourseData(scores.docs)
        const scheduleCollection = collection(courseDoc, 'schedules')
        const schedulesSnapShot = await getDocs(scheduleCollection)

        const schedules = [];
        for (const sch of schedulesSnapShot.docs) {
            const isCompleted = sch.data().completed === true
            if (!isCompleted)
                schedules.push(
                    {
                        id: sch.id,
                        ...sch.data()
                    }
                )
        }
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
            score: Number(score),
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

module.exports.editCourse = async (req, res) => {
    try {
        const {
            id,
            meetingTimes,
            syllabus,
            instructor,
            course,
            userId
        } = req.body;

        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const courseDoc = doc(courseCollection, id);
        await updateDoc(courseDoc, {
            meetingTimes,
            syllabus,
            instructor,
            course
        }, { merge: true });

        res.status(200).json({ message: 'Succesfully updated course' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
}

module.exports.deleteCourse = async (req, res) => {
    try {
        const { id, userId } = req.body;
        const userDoc = doc(usersCollection, userId);
        const courseCollection = collection(userDoc, 'courses');
        const courseDoc = doc(courseCollection, id);
        await deleteDoc(courseDoc);
        res.status(200).json({ message: 'Succesfully deleted course' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something went wrong" });
    }
}