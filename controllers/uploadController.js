// // controllers/uploadController.js

// const gfs = require('../config/gridfs');
// const Notice = require('../models/NoticeModel');
// const upload = require('../config/multer');

// // Apply the upload middleware to the route
// const uploadFile = upload.single('file');

// const handleFileUpload = async (req, res) => {
//   try {
//     const { file } = req;
//     const { title } = req.body;

//     // Create write stream to store the file content in GridFS
//     const writeStream = gfs.createWriteStream({
//       filename: file.originalname,
//       metadata: { title },
//     });

//     // Pipe the file buffer to the write stream
//     writeStream.write(file.buffer);
//     writeStream.end();

//     // Save file metadata to MongoDB
//     const notice = new Notice({
//       title,
//       filename: file.originalname,
//     });
//     await notice.save();

//     res.status(200).json({
//       success: true,
//       message: 'File uploaded successfully',
//     });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({
//       success: false,
//       error,
//       message: 'Error uploading file',
//     });
//   }
// };

// module.exports = {
//   uploadFile: uploadFile,
// };
