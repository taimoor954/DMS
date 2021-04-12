exports.getAllDoctors = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'Get all Doctors',
  });
};

//TO GET SPECFIC DR BY PROVIDING HIS/HER ID
exports.getDoctorById = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'get Doctor by id',
  });
};

//CREATE A NEW DOCTOR
//SHOULD ONLY BE PERMITTED TO ADMIN I GUESS
exports.createDoctor = (request, response) => {
  response.status(201).json({
    status: 'Success',
    data: 'create Doctor',
  });
};

//SHOULD ONLY BE PERMITTED TO ADMIN & DOCTOR HIMSELF I GUESS

exports.updateDoctor = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'update Doctor',
  });
};

//SHOULD ONLY BE PERMITTED TO ADMIN & DOCTOR HIMSELF I GUESS

exports.deleteDoctor = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'delete Doctor',
  });
};
