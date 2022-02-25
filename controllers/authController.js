const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      err,
    });
  }
};

// aşağıdaki fonksiyonda async await kullanılmadı code: 'ERR_HTTP_HEADERS_SENT' hatası veriyor
exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
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
  const user = await User.findOne({ _id: req.session.userID });
  res.status(200).render('dashboard', {
    navigation_active: 'dashboard',
    user,
  });
};
