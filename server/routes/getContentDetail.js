const router = require("express").Router();
const subcontents = require("../models/subcontent");
const content = require("../models/subcontent");
const userEnrollment = require("../models/userEnrollment")

// const Content = require('../models/content');
router.get('/:userName', async (req, res) => {
  let userName = req.params.userName;
  console.log("here");
    try {
      const contentName = await userEnrollment.find({email:userName});
      console.log(contentName);
      const subContent = await subcontents.find({contentName:contentName[0].contentName});
      console.log(subContent);
      res.json(subContent);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;