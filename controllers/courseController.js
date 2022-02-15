const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      err,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).render('courses', {
      courses,
      navigation_active: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'not courses',
      error,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById({ _id: req.params.id });

    res.status(200).render('course', {
      course,
      navigation_active: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'not course',
      error,
    });
  }
};
