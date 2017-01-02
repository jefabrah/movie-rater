var handleError   = require('./error');

module.exports = function (id, cb) {
  db.User.findOne({ where: { id: id }})
    .then(function (user) {
      cb(user.admin, false);
    })
    .catch(function (err) {
      cb(false, err);
    })
};