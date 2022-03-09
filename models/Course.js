const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

CourseSchema.pre('validate', function (next) {
  // yeni kurs oluşturmadan hemen önce çalışır.
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, //gereksiz karakterleri siler
  });
  next();
});

const Course = mongoose.model('course', CourseSchema);
module.exports = Course;
