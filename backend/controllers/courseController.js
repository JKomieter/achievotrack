const {  collection, addDoc, doc } = require('firebase/firestore')

module.exports.addCourse = async (req, res) => {
    try {
        const {} = req.body;
        const usersCollection = collection(db, 'users');
        const userDoc = doc(usersCollection, 'courses');
        await addDoc(
            userDoc, {

            }
        );        

        res.status(200).json({ message: 'Succesfully added course' })
    } catch (error) { 
        console.log(error);
        res.status(400).json({ error: "Something went wrong" })
    }
}