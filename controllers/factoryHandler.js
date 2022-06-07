const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErrors");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(`No document found with the id: ${id}`, 404));
    }
    await document.remove();
    res.status(204).json({ date: document });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(`No document found with the id: ${req.params.id}`, 404)
      );
    }
    await document.save();
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    await document.save();
    res.status(201).json(document);
  });

exports.getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let filter = {_id: id}
    if(req.filter){filter = {...filter, ...req.filter}}
    let query = await Model.findOne(filter);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const document = await query;
    if (!document) {
      return next(new ApiError(`No document found with the id: ${id}`, 404));
    }
    res.status(200).json({date: document });
  });

exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filter) {
      filter = req.filter;
    }
    const documentsCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCount)
      .search(modelName)
      .filtering()
      .limitFields()
      .sort();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const execQuery = mongooseQuery.clone();
    const documents = await execQuery;
    res
      .status(200)
      .json({ paginationResult, result: documents.length, data: documents });
  });
