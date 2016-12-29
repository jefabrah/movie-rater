module.exports = function (req, res) {
  console.log('index route', req.session);
  res.render('home');
};