const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
});

CategorySchema.pre('validate', function (next) { // yeni kurs oluşturmadan hemen önce çalışır.
  this.slug = slugify(this.name, {
    lower: true,
    strict: true, //gereksiz karakterleri siler
  });
  next();
}); 

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;