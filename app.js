const express = require('express');
const mongoose = require('mongoose');

const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');

const app = express();

mongoose.connect('mongodb://localhost/education').then(() => {
  console.log('DB Succsess');
});

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', pageRoute);
app.use('/courses', courseRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
