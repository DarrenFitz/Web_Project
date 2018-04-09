/*jshint esversion: 6*/
const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  //uri:'mongodb://localhost:27017/web-db', //Database URI and databse name
  uri:'mongodb://darren:wegians12@ds239309.mlab.com:39309/my-web-db',
  secret: crypto,
  db: 'my-web-db' //databse name
}
