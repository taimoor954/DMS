exports.getAllAppointments = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'Get all Appointments',
  });
};

//TO GET SPECFIC DR BY PROVIDING HIS/HER ID
exports.getAppointmentById = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'get Appointment by id',
  });
};

//CREATE A NEW Appointment
//SHOULD ONLY BE PERMITTED TO ADMIN I GUESS
exports.createAppointment = (request, response) => {
  response.status(201).json({
    status: 'Success',
    data: 'create Appointment',
  });
};

//SHOULD ONLY BE PERMITTED TO ADMIN & Appointment HIMSELF I GUESS

exports.updateAppointment = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'update Appointment',
  });
};

//SHOULD ONLY BE PERMITTED TO ADMIN & Appointment HIMSELF I GUESS

exports.deleteAppointment = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'delete Appointment',
  });
};
