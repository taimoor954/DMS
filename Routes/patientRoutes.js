const express = require('express');
const { login,  protectedRouteMiddlewareForPatients } = require('../Controller/patientAuthentication');
const router = express.Router()
const {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  getMyDoctors,
} = require('../Controller/patientController');

router.route('/').get(getAllPatients).post(createPatient);
router.route('/login-patient').post(login);
router.route('/get-my-doctors').get(protectedRouteMiddlewareForPatients,getMyDoctors)

router
  .route('/:doctorId')
  .get(getPatientById)
  .patch(updatePatient)
  .delete(deletePatient);

exports.patientRouter = router;
