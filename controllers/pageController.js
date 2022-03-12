const nodemailer = require('nodemailer');

exports.getIndexPage = async (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    navigation_active: 'index',
  });
};

exports.getAboutPage = async (req, res) => {
  res.status(200).render('about', {
    navigation_active: 'about',
  });
};

exports.getRegisterPage = async (req, res) => {
  res.status(200).render('register', {
    navigation_active: 'register',
  });
};

exports.getLoginPage = async (req, res) => {
  res.status(200).render('login', {
    navigation_active: 'login',
  });
};

exports.getContactPage = async (req, res) => {
  res.status(200).render('contact', {
    navigation_active: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  const templateMessage = `

  <h3>Message Details</h3><br>
  <h3>Subject: ${req.body.subject}</h3>
  <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
  </ul>
  <p>${req.body.message}</p>
  
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'fatihgumus72@gmail.com', // generated gmail user
      pass: 'brsabmkwhjyvrbdk', // generated gmail password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Education Contact Form: " <fatihgumus72@gmail.com>', // sender address
    to: 'fatihgumus72@gmail.com', // list of receivers
    subject: req.body.subject, // Subject line
    html: templateMessage, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.status(200).redirect('/contact');
};
