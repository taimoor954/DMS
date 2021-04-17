const express = require('express');
const {
  getAllAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require('../Controller/appointmentController');
const { protectedRouteMiddleware } = require('../Controller/patientAuthentication');
const router = express.Router();

router.route('/').get(getAllAppointments).post(protectedRouteMiddleware,createAppointment);

router
  .route('/:doctorId')
  .get(getAppointmentById)
  .patch(updateAppointment)
  .delete(deleteAppointment);

exports.appointmentRouter = router;
