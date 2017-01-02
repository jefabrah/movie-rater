var aws = require('aws-sdk');
var keys = require('../config/keys');
var S3_BUCKET = keys.S3_BUCKET;
var validateAdmin = require('./validate_admin');
var handleError = require('./error');


module.exports = function (req, res) {
  // check user for admin access
  if (req.isAuthenticated()) {
    validateAdmin(req.session.passport.user.id, function (isAdmin, err) {
      // handle any errors
      if (err) {
        handleError(res, 'Unable to find user', err);
        return;
      }
      // if not admin redirect to home page
      if (!isAdmin) {
        res.redirect('/');
      }
    });
  }
  else {
    res.redirect('/');
    return;
  }

  var s3 = new aws.S3();
  var fileName = req.query['file-name'];
  var fileType = req.query['file-type'];
  var s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, function(err, data) {
    if(err){
      console.log(err);
      return res.end();
    }
    var returnData = {
      signedRequest: data,
      url: 'https://' + S3_BUCKET + '.s3.amazonaws.com/' + fileName
    }
  res.write(JSON.stringify(returnData));
  res.end();
});

};