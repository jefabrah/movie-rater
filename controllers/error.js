module.exports = function (res, errMsg, err) {
  console.log(errMsg, err || '');
  res.render('error', {
    error: errMsg
  });
};