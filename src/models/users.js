import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

/**
 * Instance methods definitions
 */

// password comparison
schema.methods.isValidPassword = function isValidPassword (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// set password
schema.methods.setPassword = function setPassword (password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
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
    confirmed: this.confirmed,
    token: this.generateJWT()
  }
}

// uniqueness validation plugin
schema.plugin(uniqueValidator, { message: 'This email is already taken' });


export default mongoose.model('User', schema);
