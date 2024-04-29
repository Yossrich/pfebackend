const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (user_id) => {
  return jwt.sign({ user_id }, 'your-secret-key', { expiresIn: '3d' });
};

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  ID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'professor'],
    
  },
}, { timestamps: true });

userSchema.statics.signup = async function (name, email, ID, password, role) {
  try {
    const exists = await this.findOne({ ID });

    if (exists) {
      throw new Error('ID already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, email, ID, password: hash, role });

    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.login = async function (ID, password) {
  try {
    const user = await this.findOne({ ID });
    if (!user) {
      throw new Error('Incorrect ID');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('Incorrect password');
    }

    const token = createToken(user._id);
    const role = user.role;

    return { token, role };
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
