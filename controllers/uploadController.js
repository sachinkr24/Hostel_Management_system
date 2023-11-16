const Notice = require('../models/NoticeModel');

const getNoticesController =async (req, res) => {
    try {
      const notices = await Notice.find();
      res.json(notices);
    } catch (err) {
      res.json({ message: err.message });
    }
  };

  const postNoticeController =async (req, res) => {
    const notice = new Notice({
        title: req.body.title,
        content: req.body.content
      });
    
      try {
        const savedNotice = await notice.save();
        res.status(200).send({
          success: true,
          message: "Notice pinned on notice-board SUccessfully",
        });
      
      } catch (err) {
        res.json({ message: err.message });
      }
    };

    module.exports = {
        getNoticesController,
        postNoticeController
       
      };