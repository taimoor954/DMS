const express = require('express');
const {
  getAllAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require('../Controller/appointmentController');
const {
  protectPatientsRoute, protectPatientRoutes
} = require('../Controller/patientAuthentication');
const router = express.Router();

router
  .route('/')
  .get(getAllAppointments) //api will be use by admin
  .post(protectPatientRoutes,createAppointment); //api will be use by patient

router
  .route('/:doctorId')
  .get(getAppointmentById) //api will be use by admin
  .patch(updateAppointment) //api will be use by admin
  .delete(deleteAppointment); //api will be use by admin

exports.appointmentRouter = router;
