const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });

    res.status(201).redirect('/courses');
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      err,
    });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();

    res.status(200).render('courses', {
      courses,
      categories,
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
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();

    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );

    res.status(200).render('course', {
      course,
      categories,
      courses,
      navigation_active: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'not course',
      error,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);

    // kurs id ile body'den gelen course id eşit ise ekleyecek
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'not enroll course',
      error,
    });
  }
};
