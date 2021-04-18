const express = require('express');
const { login,  protectPatientRoutes  } = require('../Controller/patientAuthentication');
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
router.route('/getmydoctors').get(protectPatientRoutes,getMyDoctors)

router
  .route('/:doctorId')
  .get(getPatientById)
  .patch(updatePatient)
  .delete(deletePatient);

exports.patientRouter = router;
