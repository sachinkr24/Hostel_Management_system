const {GridFsStorage} = require('multer-gridfs-storage');
require('dotenv').config();
const multer = require("multer");

const storage = new GridFsStorage({
    url : process.env.MONGODB_URL,
    options: {useNewUrlParser: true},
    file : (req,file) => {
        const match=['image/png','image/jpg'];
        if(match.indexOf(file.memeType) == -1){
        return `${Date.now()}-complaint-${file.originalname}`;
        }
    
    return {
        bucketName: "photo",
        filename: `${Date.now()}-complaint-${file.originalname}`
    }
}
}) ;

module.exports = multer({ storage });