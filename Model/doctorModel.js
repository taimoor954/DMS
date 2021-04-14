const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please insert a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'doctor', 'admin'],
    default: 'user',
  },
  speciality: {
    type: String,
    required: [true, 'Especiallity is required'],
  },
  experience: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 4,
    select: false, //will not be shown up when data will be fetched from database
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password Confirmation is required'],
    validate: {
      //this only work on save or create not on find one and update
      validator: function (passConfirm) {
        return passConfirm === this.password; //if pass confirm then true else false
      },
      message: 'Sorry passwords are diffrent', //err message
    },
  },
});


//hash pass before saving doc
doctorSchema.pre('save', async function (next) {
  //if the pass is modified only then encrypt dontt encrypt again and again
  //  when email or other fields are modifier
  if (!this.isModified('password')) return next();

  //hash pass with cost of 12 //jitna ziada hash cost utna ziada time taken and utna ziada enrypted
  this.password = await bcrypt.hash(this.password, 12);
  //delete pass comfirm field
  this.passwordConfirm = undefined;
});
doctorSchema.methods.matchPassword = async function (
  requestBodyPassword,
  storedPassword
) {
  return await bcrypt.compare(storedPassword, requestBodyPassword); //rettuns bool
};

const Doctor = mongoose.model('Doctor', doctorSchema);
exports.Doctor = Doctor;
