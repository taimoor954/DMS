const express = require('express');
const { login } = require('../Controller/doctorAuthentication');
const {
  getAllDoctors,
  createDoctor,
  deleteDoctor,
  getDoctorById,
  updateDoctor,
} = require('../Controller/doctorController');
const router = express.Router();

router.route('/').get(getAllDoctors).post(createDoctor);
router.route('/login-doctor').post(login);

router
  .route('/:doctorId')
  .get(getDoctorById)
  .patch(updateDoctor)
  .delete(deleteDoctor);

exports.doctorRouter = router;
