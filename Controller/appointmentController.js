const { Appointment } = require("../Model/appointmentModel");
const catchAsync = require("../utils/catchAsync");
const { getAllFactory } = require("./handlerFactory");

exports.getAllAppointments = getAllFactory(Appointment)

//TO GET SPECFIC DR BY PROVIDING HIS/HER ID
exports.getAppointmentById = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'get Appointment by id',
  });
};

//CREATE A NEW Appointment
//SHOULD ONLY BE PERMITTED TO ADMIN I GUESS
exports.createAppointment = catchAsync(async(request, response) => {
const appointment = await Appointment.create({
  patient : request.user,
  doctor : request.body.doctorId
})

response.status(200).json({
  status:'success',
  data:appointment
})

});

//SHOULD ONLY BE PERMITTED TO ADMIN & Appointment HIMSELF I GUESS

exports.updateAppointment = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'update Appointment',
  });
};

//SHOULD ONLY BE PERMITTED TO ADMIN & Appointment HIMSELF I GUESS

exports.deleteAppointment = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'delete Appointment',
  });
};
