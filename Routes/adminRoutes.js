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
const { getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment } = require('../Controller/appointmentController');
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
const { logout } = require('../middleware/middleware');
const router = express.Router();

router.route('/').get(getAllAdmins).post(createAdmin);
router.route('/login-admin').post(login);



router.use(protectAdminRoutes);//All below will be protected now. Admin must be logged in before using below functionlities

router.route('/logout').get(logout)

router
  .route('/get-admin-by-id/:Id')
  .get(getAdminById)
  .patch(updateAdmin)
  .delete(deleteAdmin);

router.route('/getAllDoctors').get(getAllDoctors);
router.route('/getAllPatients').get(getAllPatients);
router.route('/getAllAppointments').get(getAllAppointments)

router
  .route('/get-patient-by-id/:Id')
  .get(getPatientById) //api will be use by admin side only
  .patch(updatePatient) //api will be use by patient side just
  .delete(deletePatient); //api will be use by admin

router
  .route('/get-doctor-by-id/:Id')
  .get(getDoctorById) // api will be use by both client and doctor side
  .patch(updateDoctor) // api will be use by doctor side
  .delete(deleteDoctor); //// api will be use by admin side and doctor side

  router
  .route('/get-appointment-by-id/:Id')
  .get(getAppointmentById) // api will be use by both client and doctor side
  .patch(updateAppointment) // api will be use by doctor side
  .delete(deleteAppointment); //// api will be use by admin side and doctor side


exports.adminRouter = router;
