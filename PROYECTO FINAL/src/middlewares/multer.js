const multer = require('multer');
const mimeTypes = require('mime-types');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'src/public/img')
  },
  filename : (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + mimeTypes.extension(file.mimetype));
  }
});
const upload = multer({storage : storage});

module.exports = upload;