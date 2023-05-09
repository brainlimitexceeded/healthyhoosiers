const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const router = express.Router();
const File = require('../models/fileSchema');
const SubContent = require('../models/subcontent');

AWS.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  }),
});
router.post('/upload/:subContentName', upload.single('file'), async (req, res) => {
  try {
    const subContent = await SubContent.findOne({ name: req.params.subContentName });
    console.log(subContent);
    if (!subContent) {
      return res.status(404).send('SubContent not found');
    }
    const { originalname, mimetype, size, location} = req.file;
    const newFile = await File.create({
      name: originalname,
      type: mimetype,
      size: size,
      url: location,
      subContentName: req.params.subContentName // add reference to subContent document
    });
    // console.log(subContentName);
    res.send(newFile.url);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

