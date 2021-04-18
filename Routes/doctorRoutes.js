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
const router = express.Router();


router.route('/').get(getAllDoctors).post(createDoctor);
router.route('/get-my-pateints').get( protectDoctorRoutes,getMyPatients)
router.route('/login-doctor').post(login);
// router.route('/protect').get(protectedRouteMiddleware);

router
  .route('/:doctorId')
  .get(getDoctorById)
  .patch(updateDoctor)
  .delete(deleteDoctor);

exports.doctorRouter = router;
