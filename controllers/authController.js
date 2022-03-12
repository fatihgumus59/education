const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      err,
    });
  }
};

// aşağıdaki fonksiyonda async await direk kullanılmadı const değişkenine atıldı hata vermiyor bu şekilde
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findOne({ email }, (err, user) => {
      if (user) {
        // user varsa
        bcrypt.compare(password, user.password, (err, same) => {
          // gelen şifre ile veritabanında ki şifre aynı ise
          if (same) {
            // user session
            req.session.userID = user._id;
            res.status(200).redirect('/');
          }
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      err,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    'courses'
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  res.status(200).render('dashboard', {
    navigation_active: 'dashboard',
    user,
    categories,
    courses,
  });
};
