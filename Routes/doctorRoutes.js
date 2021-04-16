const express = require('express');
const { login, protectedRouteMiddleware } = require('../Controller/doctorAuthentication');
const {
  getAllDoctors,
  createDoctor,
  deleteDoctor,
  getDoctorById,
  updateDoctor,
} = require('../Controller/doctorController');
const router = express.Router();


router.route('/').get(protectedRouteMiddleware,getAllDoctors).post(createDoctor);
router.route('/login-doctor').post(login);
// router.route('/protect').get(protectedRouteMiddleware);

router
  .route('/:doctorId')
  .get(protectedRouteMiddleware,getDoctorById)
  .patch(protectedRouteMiddleware,updateDoctor)
  .delete(protectedRouteMiddleware,deleteDoctor);

exports.doctorRouter = router;
