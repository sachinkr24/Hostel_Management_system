const grid = require("gridfs-stream");
const mongoose = require("mongoose");
const {connect,connection} = require("mongoose");

let gfs,gridfsBucket;

const conn= mongoose.connection;
conn.once('open',()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs=grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

const imageController= (req,res)=>{
    if(!req.file) {
        return res.status(404).json({ msg: "File not found"});
    }

    const imageUrl = `${Date.now()}-complaint-${req.file.originalname}`;

    return res.status(200).json(imageUrl);
}
  
const getImage = async(req,res) => {
    try{
        const file= await gfs.files.findOne({ filename: req.params.filename});
        const readStream= gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    }
    catch(error) {
       return res.status(500).json({msg : error});
    }
}
module.exports = {imageController,getImage};