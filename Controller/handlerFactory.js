const { APIFeatures } = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const { AppError } = require('../utils/Error');

exports.deleteFactory = (Model) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.findByIdAndDelete(request.params.doctorId);
    if (!doc) {
      //ERROR CLASSS AIEGA YAHA
      return next(new AppError('No doc with this ID found', 404));
    }
    return response.status(200).json({
      status: 'Success ',
      message: 'Succesfully deleted',
    });
  });

exports.updateFactory = (Model) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.findByIdAndUpdate(
      request.params.doctorId,
      request.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) {
      //Error aiega yaha

      return next(new AppError('No doc with this ID found', 404));
    }
    return response.status(200).json({
      status: 'Success ',
      message: 'Succesfully updated ',
      data: {
        doc,
      },
    });
  });

exports.createFactory = (Model) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.create(request.body);
    return response.status(201).json({
      status: 'sucess',
      data: {
        doctor: doc,
      },
    });
  });

exports.getOneFactoryById = (Model, populateOptions) =>
  catchAsync(async (request, response, next) => {
    let query = Model.findById(request.params.doctorId);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    if (!doc) {
      console.log('working ');
      return next(new AppError('No doc with this ID found', 404));
    }
    return response.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getAllFactory = (Model) =>
  catchAsync(async (request, response, next) => {
    var filterObject = {};
    if (request.params.tourId) {
      filterObject = {
        tour: request.params.tourId,
      };
    }

    const features = new APIFeatures(Model.find(filterObject), request.query)
      .filter()
      .sort()
      .filedLimiting()
      .pagination();

    const doc = await features.query;
    return response.status(200).json({
      status: 'Success',
      results: doc.length,
      data: {
        doc: doc,
      },
    });
  });



