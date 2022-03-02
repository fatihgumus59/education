const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ['Teacher', 'Student', 'Admin'],
    default: 'student',
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.role == 'admin') {
    user.role == 'student';
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    // 10 yazan yer  şifrenin zorluğunu arttırıyor.
    user.password = hash;
    next();
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
