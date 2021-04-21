const express = require('express');
const {
  protectAdminRoutes,
  login,
} = require('../Controller/adminAuthentication');
const {
  getAllAdmins,
  createAdmin,
  getAdminById,
  deleteAdmin,
  updateAdmin,
} = require('../Controller/adminController');
const {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
} = require('../Controller/doctorController');
const {
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require('../Controller/patientController');
const router = express.Router();

router.route('/').get(getAllAdmins).post(createAdmin);

router
  .route('/:adminId')
  .get(getAdminById)
  .patch(updateAdmin)
  .delete(deleteAdmin);

router.route('/getAllDoctors').get(protectAdminRoutes, getAllDoctors);
router.route('/getAllPatients').get(protectAdminRoutes, getAllPatients);

router.route('/login-admin').post(login);

router
  .route('/:Id')
  .get(getPatientById) //api will be use by admin side only
  .patch(updatePatient) //api will be use by patient side just
  .delete(deletePatient); //api will be use by admin

router
  .route('/:Id')
  .get(getDoctorById) // api will be use by both client and doctor side
  .patch(updateDoctor) // api will be use by doctor side
  .delete(deleteDoctor); //// api will be use by admin side and doctor side

exports.adminRouter = router;
