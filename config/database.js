const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
  uri:'mongodb://localhost:27017/web-db', //Database URI and databse name
  secret: crypto,
  db: 'web-db' //databse name
}
