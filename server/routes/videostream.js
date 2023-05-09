// const express = require("express");
// const AWS = require("aws-sdk");
// const router = express.Router();
// const fs = require('fs');
// const path = require('path');

// // Initialize AWS S3
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region : process.env.AWS_BUCKET_REGION
// });

// const bucketName ="se-video-api";
// router.get('/videos', function (req, res) {
//   // Call S3 to list the objects in the bucket
//   s3.listObjects({ Bucket: bucketName }, function (err, data) {
//     console.log(bucketName);
//     if (err) {
//       console.log('Error:', err);
//       res.status(500).send('Error: ' + err.message);
//     } else {
//       const videos = data.Contents.filter(function (content) {
//         return content.Key.endsWith('.mp4') || content.Key.endsWith('.avi') || content.Key.endsWith('.mov');
//       }).map(function (content) {
//         return content.Key;
//       });
//       res.json({ videos: videos });
//     }
//   });
// });

// router.get('/videos/:filename', function (req, res) {
//   const filename = req.params.filename;

//   // Check if the file exists in the S3 bucket
//   s3.headObject({ Bucket: bucketName, Key: filename }, function (err, metadata) {
//     if (err) {
//       console.log('Error:', err);
//       res.status(404).send('File not found');
//     } else {
//       // Create a stream to read the file from S3
//       const stream = s3.getObject({ Bucket: bucketName, Key: filename }).createReadStream();

//       // Set the Content-Type header based on the file extension
//       const contentType = getContentType(filename);
//       res.set('Content-Type', contentType);

//       // Pipe the stream to the response object
//       stream.pipe(res);
//     }
//   });
// });

// // Helper function to get the Content-Type header based on the file extension
// function getContentType(filename) {
//   const extname = path.extname(filename).toLowerCase();
//   switch (extname) {
//     case '.mp4':
//       return 'video/mp4';
//     case '.avi':
//       return 'video/x-msvideo';
//     case '.mov':
//       return 'video/quicktime';
//     default:
//       return 'application/octet-stream';
//   }
// }

// module.exports = router;
const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const File = require('../models/fileSchema');

// Initialize AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region : process.env.AWS_BUCKET_REGION
});

const bucketName ="se-video-api";
router.get('/videos/:subContentName', async function (req, res) {
  const subContentName = req.params.subContentName;
  try {
    // Query the database to get all files with the given subContentName
    const files = await File.find({ subContentName });
    
    // Map each file to extract the required information
    const videos = files.map(file => {
      const filename = file.name;
      const fileUrl = file.url;
      const thumbnailUrl = `${fileUrl.substring(0, fileUrl.lastIndexOf('/'))}/thumbnails/${filename}.jpg`;
      return { filename, fileUrl, thumbnailUrl };
    });

    res.json({ videos });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).send('Error: ' + err.message);
  }
});


router.get('/videos/:filename', function (req, res) {
  const filename = req.params.filename;

  // Check if the file exists in the S3 bucket
  s3.headObject({ Bucket: bucketName, Key: filename }, function (err, metadata) {
    if (err) {
      console.log('Error:', err);
      res.status(404).send('File not found');
    } else {
      // Create a stream to read the file from S3
      const stream = s3.getObject({ Bucket: bucketName, Key: filename }).createReadStream();

      // Set the Content-Type header based on the file extension
      const contentType = getContentType(filename);
      res.set('Content-Type', contentType);

      // Pipe the stream to the response object
      stream.pipe(res);
    }
  });
});

// Helper function to get the Content-Type header based on the file extension
function getContentType(filename) {
  const extname = path.extname(filename).toLowerCase();
  switch (extname) {
    case '.mp4':
      return 'video/mp4';
    case '.avi':
      return 'video/x-msvideo';
    case '.mov':
      return 'video/quicktime';
    default:
      return 'application/octet-stream';
  }
}

module.exports = router;

