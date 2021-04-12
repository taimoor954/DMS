const express = require('express');
const router = express.Router()
const {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient,
} = require('../Controller/patientController');

router.route('/').get(getAllPatients).post(createPatient);

router
  .route('/:doctorId')
  .get(getPatientById)
  .patch(updatePatient)
  .delete(deletePatient);

exports.patientRouter = router;
