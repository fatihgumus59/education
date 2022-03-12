const express = require('express');
const pageController = require('../controllers/pageController');
const redirectMiddleware = require('../middleware/redirectMiddleware');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/login').get(redirectMiddleware, pageController.getLoginPage); // giriş yapılı olduğu halde giriyorsa ana sayfaya gönder işlemleri
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage); // giriş yapılı olduğu halde giriyorsa ana sayfaya gönder işlemleri
router.route('/contact').get( pageController.getContactPage);
router.route('/contact').post( pageController.sendEmail);

module.exports = router;
