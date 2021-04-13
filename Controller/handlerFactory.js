const { APIFeatures } = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
// const { AppError } = require('../utils/Error');

exports.deleteFactory = (Model) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.findByIdAndDelete(request.params.id);
    if (!doc) {
      return next(new AppError('No doc with this ID found', 404));
    }
    return response.status(200).json({
      status: 'Success ',
      message: 'Succesfully deleted',
    });
  });

exports.updateFactory = (Model) =>
  catchAsync(async (request, response, next) => {
    const doc = await Model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
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
        tour: doc,
      },
    });
  });

exports.getOneFactoryById = (Model, populateOptions) =>
  catchAsync(async (request, response, next) => {
    let query = Model.findById(request.params.doctorId);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;
    if (!doc) {
      //Error class aiegi yahan
      return response.status(400).json({
        status: 'failed',
      });
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
    console.log(request.params.ratingAverage);

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
