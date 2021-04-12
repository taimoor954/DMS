const express = require('express');
const {
  getAllDoctors,
  createDoctor,
  deleteDoctor,
  getDoctorById,
  updateDoctor,
} = require('../Controller/doctorController');
const router = express.Router();

router.route('/').get(getAllDoctors).post(createDoctor);

router
  .route('/:doctorId')
  .get(getDoctorById)
  .patch(updateDoctor)
  .delete(deleteDoctor);

exports.doctorRouter = router;
