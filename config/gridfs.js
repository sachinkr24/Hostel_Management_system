const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const connectDB = require('./db');

Grid.mongo = mongoose.mongo;

const gfs = new Grid(connectDB);

module.exports = gfs;
