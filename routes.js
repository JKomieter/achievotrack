const router = require('express').Router();
const {signup, addAcademicDetails, getUser, login, logout} = require('./controllers/userController');
const {addSchedule, updateSchedule, getSchedules, deleteSchedule, markAsDone} = require("./controllers/scheduleController");
const { addItem, getItems, getCart, addItemToCart, searchItem, getRelatedItems } = require('./controllers/marketController');
const { addCourse, getCourses, getCourse, addScoreToCourse, editCourse, deleteCourse } = require('./controllers/courseController')

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.post('/addAcademicDetails', addAcademicDetails);

router.post('/addSchedule', addSchedule);

router.get('/getUser', getUser)

router.post('/updateSchedule', updateSchedule);

router.post('/deleteSchedule', deleteSchedule);

router.get('/getSchedules', getSchedules);

router.post('/markAsDone', markAsDone)

router.post('/addItem', addItem);

router.get('/getItems', getItems);

router.get('/getCart', getCart);

router.post('/addItemToCart', addItemToCart);

router.post('/getRelatedItems', getRelatedItems);

router.get('/searchItem', searchItem);

router.post('/addCourse', addCourse);

router.get('/getCourses', getCourses);

router.get('/getCourse', getCourse);

router.post('/addScore', addScoreToCourse);

router.post('/editCourse', editCourse);

router.post('/deleteCourse', deleteCourse);

module.exports = router;