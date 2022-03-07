const express = require('express');
const courseController = require('../controllers/courseController');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.route('/').post(roleMiddleware(['Student','Teacher']), courseController.createCourse);
router.route('/').get(courseController.getAllCourse);
router.route('/:slug').get(courseController.getCourse);

module.exports = router;
