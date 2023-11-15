// config/multer.js

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB (adjust as needed)
  },
});

module.exports = upload;
