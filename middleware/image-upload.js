const multer = require('multer');
const { v4: uuid } = require("uuid");

const TYPE_IMAGE = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};
const TYPE_File = {
  'application/pdf': 'pdf',
};

const fileUpload = 
  multer({
    limits: 500000, 
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        if(TYPE_IMAGE[file.mimetype]){
          cb(null, 'uploads/images');
        }
        if(TYPE_File[file.mimetype]){
          cb(null, 'uploads/cv');
        }
        
      },
      filename: (req, file, cb) => {
        const ext = (TYPE_IMAGE[file.mimetype]) ? TYPE_IMAGE[file.mimetype] : TYPE_File[file.mimetype];
        cb(null, uuid() + '.' + ext);
      }
    }),
    fileFilter: (req, file, cb) => {
      let size = +req.rawHeaders.slice(-1)[0]
      let isValid =false;
      if(!!TYPE_IMAGE[file.mimetype]){
        isValid = true
      }
      if(!!TYPE_File[file.mimetype]){
        isValid = true
      }
      let error = isValid ? null : new Error('Invalid mime type!');
      cb(error, isValid);
    }
  });


module.exports = fileUpload;