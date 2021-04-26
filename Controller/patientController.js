const { Appointment } = require('../Model/appointmentModel');
const { Patient } = require('../Model/patientModel');
const catchAsync = require('../utils/catchAsync');
const {
  getAllFactory,
  createFactory,
  getOneFactoryById,
  updateFactory,
  deleteFactory,
} = require('./handlerFactory');

exports.getAllPatients = getAllFactory(Patient);

//TO GET SPECFIC DR BY PROVIDING HIS/HER ID
exports.getPatientById = getOneFactoryById(Patient);

//CREATE A NEW Patient
//SHOULD ONLY BE PERMITTED TO ADMIN I GUESS
//WORK AS SIGNUP
exports.createPatient = createFactory(Patient);
//SHOULD ONLY BE PERMITTED TO ADMIN & Patient HIMSELF I GUESS

exports.updatePatient = updateFactory(Patient);

//SHOULD ONLY BE PERMITTED TO ADMIN & Patient HIMSELF I GUESS

exports.deletePatient = deleteFactory(Patient);

exports.getMyDoctors = catchAsync(async (request, response, next) => {
  const appointments = await Appointment.find({ patient: request.user.id });
  response.status(200).json({
    total: appointments.length,
    appointments,
  });
});
