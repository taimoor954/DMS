const { Doctor } = require("../Model/doctorModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllDoctors = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'Get all Doctors',
  });
};

//TO GET SPECFIC DR BY PROVIDING HIS/HER ID
exports.getDoctorById = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'get Doctor by id',
  });
};

//CREATE A NEW DOCTOR
//SHOULD ONLY BE PERMITTED TO ADMIN I GUESS
exports.createDoctor = catchAsync( async (request, response) => {
  try {
    const doctor = await Doctor.create({
      name:request.body.name,
      email:request.body.email,
      password:request.body.password,
      passwordConfirm:request.body.passwordConfirm,
      role:request.body.role,
    })
    
    
    response.status(201).json({
      status: 'Success',
      data: doctor,
    });
  } catch (error) {
    response.status(400).json({
      status: 'Failed',
      error ,
    });
  }
 
});

//SHOULD ONLY BE PERMITTED TO ADMIN & DOCTOR HIMSELF I GUESS

exports.updateDoctor = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'update Doctor',
  });
};

//SHOULD ONLY BE PERMITTED TO ADMIN & DOCTOR HIMSELF I GUESS

exports.deleteDoctor = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'delete Doctor',
  });
};
