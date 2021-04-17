const express = require('express');
const { login,  protectedRouteMiddlewareForDoctor } = require('../Controller/doctorAuthentication');
const {
  getAllDoctors,
  createDoctor,
  deleteDoctor,
  getDoctorById,
  updateDoctor,
  getMyPatients,
} = require('../Controller/doctorController');
const router = express.Router();


router.route('/').get(protectedRouteMiddlewareForDoctor,getAllDoctors).post(createDoctor);
router.route('/get-my-pateints').get(protectedRouteMiddlewareForDoctor, getMyPatients)
router.route('/login-doctor').post(login);
// router.route('/protect').get(protectedRouteMiddleware);

router
  .route('/:doctorId')
  .get(protectedRouteMiddlewareForDoctor,getDoctorById)
  .patch(protectedRouteMiddlewareForDoctor,updateDoctor)
  .delete(protectedRouteMiddlewareForDoctor,deleteDoctor);

exports.doctorRouter = router;
