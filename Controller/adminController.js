// const { Appointment } = require('../Model/appointmentModel');
const { Admin } = require('../Model/adminModel');
const catchAsync = require('../utils/catchAsync');
const {
  getAllFactory,
  createFactory,
  getOneFactoryById,
  updateFactory,
  deleteFactory,
} = require('./handlerFactory');

exports.getAllAdmins = getAllFactory(Admin);

//TO GET SPECFIC DR BY PROVIDING HIS/HER ID
exports.getAdminById = getOneFactoryById(Admin);

//CREATE A NEW Admin
//SHOULD ONLY BE PERMITTED TO ADMIN I GUESS
//WORK AS SIGNUP
exports.createAdmin = createFactory(Admin);
//SHOULD ONLY BE PERMITTED TO ADMIN & Admin HIMSELF I GUESS

exports.updateAdmin = updateFactory(Admin);

//SHOULD ONLY BE PERMITTED TO ADMIN & Admin HIMSELF I GUESS

exports.deleteAdmin = deleteFactory(Admin);

// exports.getMyPatients = catchAsync(async(request, response, next) => {
// const appointments = await Appointment.find({doctor : request.user.id})
// response.status(200).json({
//   patients : appointments
// })
// })
