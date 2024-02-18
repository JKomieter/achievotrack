const router = require('express').Router();
const {signup, addAcademicDetails} = require('./controllers/userController');
const {addSchedule, updateSchedule} = require("./controllers/scheduleController");

router.post('/signup', signup);

router.post('/addAcademicDetails', addAcademicDetails);

router.post('/addSchedule', addSchedule);

router.post('/updateSchedule', updateSchedule)

module.exports = router;