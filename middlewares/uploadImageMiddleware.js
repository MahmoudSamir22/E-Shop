const multer = require("multer");

const ApiError = require("../utils/apiErrors");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();

  const multerFilter = (req, file, cb) => {
    console.log(req.file, file);
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("Images only supported", 400), false);
    }
  };
  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
  return upload
}

// 1) Disk Storage engine
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const fileName = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, fileName);
//   },
// });

exports.uploadSingleImage = (fieldName) =>  multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrOfFields) =>  multerOptions().fields(arrOfFields)
