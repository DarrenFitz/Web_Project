const User = require('../models/user')

module.exports = (router) => {

  router.post('/register', (req, res) => {
    if(!req.body.email){
      res.json({success: false, message :'You must enter an e-mail'});// return error
    }else{
      if(!req.body.username){
        res.json({success: false, message :'You must enter a username'});// return error
      } else {
        if(!req.body.password){
          res.json({success: false, message :'You must enter a password'});// return error
        }else {
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          });
          //save user to database
          user.save((err) => {
            //check for error
            if (err){
              if(err.code === 11000){
                res.json({success:false, message: 'Username or e-mail already exists! Please Try Again!'});
              }else{
                //check if it's a validation error
                if(err.errors){
                  if (err.errors.email){
                    res.json({success:false, message: err.errors.email.message});
                  }else{
                    if(err.errors.username){
                      res.json({success:false, message: err.errors.username.message});
                    }else{
                      if(err.errors.password){
                        res.json({success:false, message: err.errors.password.message});
                      }else{
                          res.json({success:false, message: err});
                      }
                    }
                  }
                }else{
                  res.json({success:false, message: 'Could not save user. Error', err}); //condidtions met, return error not related to validation
                }
              }
            }else{
              res.json({success:true, message: 'User saved!'})
            }
          });
        }
      }
    }
  });

    return router;

}
