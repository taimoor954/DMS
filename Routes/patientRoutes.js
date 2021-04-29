const express = require('express');
const { getAllDoctors } = require('../Controller/doctorController');
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
const { logout } = require('../middleware/middleware');

router.route('/').get(protectPatientRoutes,getAllPatients) //api will be use by just admin side
.post(createPatient); //api will be use by patient side just

router.route('/login-patient').post(login); //api will be use by patient side just

router.route('/').get(protectPatientRoutes,getAllDoctors)// api will be use by both client and doctor side

router.route('/getmydoctors')
.get(protectPatientRoutes,getMyDoctors) //api will be used by logged in patient

router
  .route('/:Id')
  .get(protectPatientRoutes,getPatientById) //api will be use by admin side only
  .patch(protectPatientRoutes,updatePatient) //api will be use by patient side just
  .delete(protectPatientRoutes,deletePatient); //api will be use by admin 

router.route('/logout').get(logout)


exports.patientRouter = router;
