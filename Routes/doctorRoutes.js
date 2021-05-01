const express = require('express');
const { login, protectDoctorRoutes} = require('../Controller/doctorAuthentication');
const {
  getAllDoctors,
  createDoctor,
  deleteDoctor,
  getDoctorById,
  updateDoctor,
  getMyPatients,
} = require('../Controller/doctorController');
const { logout } = require('../middleware/middleware');
const router = express.Router();


router.route('/login-doctor').post(login);//use by just patient
router.route('/logout-doctor').get(logout)
router.route('/').post(createDoctor); //Api will be use doctor side 


router.use(protectDoctorRoutes)


router.route('/').get(getAllDoctors)// api will be use by both client and doctor side
router.route('/get-my-pateints').get(getMyPatients) //api will be use by just patient side

router
  .route('/:Id')
  .get(getDoctorById) // api will be use by both client and doctor side
  .patch(updateDoctor)// api will be use by doctor side
  .delete(deleteDoctor); //// api will be use by admin side and doctor side



exports.doctorRouter = router;
