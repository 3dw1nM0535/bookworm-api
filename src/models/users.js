import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {timestamps: true});

/**
 * Instance methods definitions
 */

// password comparison
schema.methods.isValidPassword = function isValidPassword (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// generate web token for user credentials encryption
schema.methods.generateJWT = function generateJWT () {
  return jwt.sign({
    email: this.email
  }, process.env.SECRET_KEY);
};

// token out user credentials
schema.methods.toAuthJSON = function toAuthJSON () {
  return {
    email: this.email,
    token: this.generateJWT()
  }
}


export default mongoose.model('User', schema);
