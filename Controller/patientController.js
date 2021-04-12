exports.getAllPatients = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'Get all Patients',
  });
};

//TO GET SPECFIC DR BY PROVIDING HIS/HER ID
exports.getPatientById = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'get Patient by id',
  });
};

//CREATE A NEW Patient
//SHOULD ONLY BE PERMITTED TO ADMIN I GUESS
exports.createPatient = (request, response) => {
  response.status(201).json({
    status: 'Success',
    data: 'create Patient',
  });
};

//SHOULD ONLY BE PERMITTED TO ADMIN & Patient HIMSELF I GUESS

exports.updatePatient = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'update Patient',
  });
};

//SHOULD ONLY BE PERMITTED TO ADMIN & Patient HIMSELF I GUESS

exports.deletePatient = (request, response) => {
  response.status(200).json({
    status: 'Success',
    data: 'delete Patient',
  });
};
