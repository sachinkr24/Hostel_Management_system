// models/NoticeModel.js

const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: String,
  filename: String,
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
