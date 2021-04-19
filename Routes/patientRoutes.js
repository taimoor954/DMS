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

router.route('/')
.get(getAllPatients) //api will be use by just admin side
.post(createPatient); //api will be use by patient side just

router.route('/login-patient').post(login); //api will be use by patient side just
router.route('/getmydoctors')
.get(protectPatientRoutes,getMyDoctors) //api will be used by logged in patient

router
  .route('/:doctorId')
  .get(getPatientById) //api will be use by admin side only
  .patch(updatePatient) //api will be use by patient side just
  .delete(deletePatient); //api will be use by admin 

exports.patientRouter = router;
