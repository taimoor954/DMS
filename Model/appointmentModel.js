const mongoose = require('mongoose');
const { AppError } = require('../utils/Error');
const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient',
    required: [true, 'PatientID is required'],
  },
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor',
    required: [true, 'DcotorId is required'],
  },
  date: {
    type: Date,
    default:Date
  },
});


appointmentSchema.pre(/^find/, function (next) {
  this.populate('patient').populate('doctor')
  next()
})

const Appointment = mongoose.model('Appointment', appointmentSchema)
exports.Appointment=Appointment

