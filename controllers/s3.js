var aws = require('aws-sdk');
var keys = require('../config/keys');
var S3_BUCKET = keys.S3_BUCKET;


module.exports = function (query, cb) {
  var s3 = new aws.S3();
  var fileName = query['file-name'];
  var fileType = query['file-type'];
  var s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, function (err, data) {
    if (err) {
      console.log(err);
      return cb(null, err)
    }
    console.log(data);
    const returnData = {
      signedRequest: data,
      url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + fileName
    };
    return cb(returnData);
  })
  ;

};