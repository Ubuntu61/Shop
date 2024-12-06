import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// check the type of the file
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

// the rule for the storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
  // limit the size of the image
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

// upload the router
router.post('/', upload.single('image'), (req, res) => {
  if (req.file) {
    res.status(200).json({ path: `/${req.file.path}` });
  } else {
    res.status(400).json({ message: 'Failed to upload image' });
  }
});

export default router;