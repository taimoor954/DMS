const { Doctor } = require('../Model/doctorModel');
const catchAsync = require('../utils/catchAsync');
const {
  getAllFactory,
  createFactory,
  getOneFactoryById,
  updateFactory,
  deleteFactory,
} = require('./handlerFactory');

exports.getAllDoctors = getAllFactory(Doctor);

//TO GET SPECFIC DR BY PROVIDING HIS/HER ID
exports.getDoctorById = getOneFactoryById(Doctor);

//CREATE A NEW DOCTOR
//SHOULD ONLY BE PERMITTED TO ADMIN I GUESS
//WORK AS SIGNUP
exports.createDoctor = createFactory(Doctor);
//SHOULD ONLY BE PERMITTED TO ADMIN & DOCTOR HIMSELF I GUESS

exports.updateDoctor = updateFactory(Doctor);

//SHOULD ONLY BE PERMITTED TO ADMIN & DOCTOR HIMSELF I GUESS

exports.deleteDoctor = deleteFactory(Doctor);
