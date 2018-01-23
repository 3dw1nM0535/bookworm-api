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
  },
  confirmationToken: {
    type: String,
    default: ''
  }
}, {timestamps: true});

/**
 * Instance methods definitions
 */

// password comparison
schema.methods.isValidPassword = function isValidPassword (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

// set email confirmation token
schema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};

// generate email confirmation token url
schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
};

// generate password reset link
schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
  return `${process.env.HOST}/reset-password/${this.generateResetPasswordToken()}`;
};

// generate password reset token
schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
  return jwt.sign(
    {
    _id: this._id
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
};

// set password
schema.methods.setPassword = function setPassword (password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};

// generate web token for user credentials encryption
schema.methods.generateJWT = function generateJWT () {
  return jwt.sign({
    email: this.email,
    confirmed: this.confirmed
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
