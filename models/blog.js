/*jshint esversion: 6 */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let titleLengthChecker = (title) => {
  if (!title) {
    return false; //return error
  }else{
    if (title.length < 5 || title.length > 50){
      return false;
    } else{
      return true;
    }
  }
};

let alphaNumericTitleChecker = (title) => {
  // Check if title exists
  if (!title) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid title
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);
    return regExp.test(title); // Return regular expression test results (true or false)
  }
};

const titleValidators = [
  {
  validator: titleLengthChecker,
  message: 'Title must be between 5 and 50 characters'
  },
  {
    validator: alphaNumericTitleChecker,
    message: 'Title must be alphanumeric'
  }
];

let bodyLengthChecker = (body) => {
  if (!body) {
    return false; // Return error
  } else {
    // Check length of body string
        if (body.length < 5 || body.length > 500) {
          return false; // Return error if does not meet length requirement
        } else {
          return true; // Return as valid username
        }
  }
};

const bodyValidators = [
  // First Username validator
  {
    validator: bodyLengthChecker,
    message: 'Between 5 and 500 characters allowed.'
  },
];

let commentLengthChecker = (comment) => {
  if (!comment[0]) {
    return false;
  } else {
    if (comment[0].length < 3 || comment[0].length > 150) {
      return false;
    } else {
      return true;
    }
  }
};

const commentValidators = [
  {
    validator: commentLengthChecker,
    message: 'Comments must be between 3 and 150 characters'
  },
];

const blogSchema = new Schema({
  title:  {type: String, required: true, validate: titleValidators},
  body:  {type: String, required: true, validate: bodyValidators},
  createdBy:  {type: String },
  createdAt:  {type: String, default: Date.now() },
  likes:  {type: Number, default: 0 },
  likedBy:  {type: Array },
  dislikes:  {type: Number, default: 0 },
  dislikedBy:  {type: Array },
  comments:[
    {
      comment:{type: String, validate: commentValidators},
      commentator:{type: String}
    }
  ]
});


module.exports = mongoose.model('Blog', blogSchema);
