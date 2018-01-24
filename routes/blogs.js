/*jshint esversion: 6 */
const User = require('../models/user');
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

  router.post('/newBlog', (req, res) => {
    if (!req.body.title) {
      res.json({ success: false, message: 'Blog title is required.' }); // Return error message
    } else {
      // Check if blog body was provided
      if (!req.body.body) {
        res.json({ success: false, message: 'Blog body is required.' }); // Return error message
      } else {
        // Check if blog's creator was provided
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'Blog creator is required.' }); // Return error
        } else {
          // Create the blog object for insertion into database
          const blog = new Blog({
            title: req.body.title, // Title field
            body: req.body.body, // Body field
            createdBy: req.body.createdBy // CreatedBy field
          });
          // Save blog into database
          blog.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                // Check if validation error is in the title field
                if (err.errors.title) {
                  res.json({ success: false, message: err.errors.title.message }); // Return error message
                } else {
                  // Check if validation error is in the body field
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message }); // Return error message
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
                }
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'Blog saved!' }); // Return success message
            }
          });
        }
      }
    }
  });

  router.get('/allBlogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if blogs were found in database
        if (!blogs) {
          res.json({ success: false, message: 'No blogs found.' }); // Return error of no blogs found
        } else {
          res.json({ success: true, blogs: blogs }); // Return success and blogs array
        }
      }
    }).sort({ '_id': -1 }); //order by newest first
  });

  router.get('/singleBlog/:id', (req, res) => {

            if (!req.params.id) {
              res.json({ success: false, message: 'No blog id provided' }); // Return error message
            }else{
              Blog.findOne({ _id: req.params.id }, (err, blog) => {
                if (err) {
                  res.json({ success: false, message: 'blog id is not valid' });
                }else{
                  if (!blog) {
                    res.json({ success: false, message: 'Blog not found' });
                  }else{
                    // Find the current user that is logged in
                    User.findOne({ _id: req.decoded.userId }, (err, user) => {
                      // Check if error was found
                      if (err) {
                        res.json({ success: false, message: err }); // Return error
                      } else {
                        // Check if username was found in database
                        if (!user) {
                          res.json({ success: false, message: 'Unable to authenticate user' }); // Return error message
                        } else {
                          // Check if the user who requested single blog is the one who created it
                          if (user.username !== blog.createdBy) {
                            res.json({ success: false, message: 'You are not authorized to eidt this blog.' }); // Return authentication reror
                          } else {
                    res.json({ success: true, blog: blog });
                  }
                }
              }
            });
          }
        }
      });
    }
  });

  router.put('/updateBlog', (req, res) => {
    if (!req.body._id) {
      res.json({ success: false, message: 'No blog id provided' }); // Return error message
    }else {
      // Check if id exists in database
      Blog.findOne({ _id: req.body._id }, (err, blog) => {
        if (err) {
          res.json({ success: false, message: 'Not a valid blog id' }); // Return error message
        }else {
          // Check if id was found in the database
          if (!blog) {
            res.json({ success: false, message: 'Blog id was not found.' }); // Return error message
          } else {
            // Check who user is that is requesting blog update
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              // Check if error was found
              if (err) {
                res.json({ success: false, message: err }); // Return error message
              } else {
                // Check if user was found in the database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check if user logged in the the one requesting to update blog post
                  if (user.username !== blog.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to edit this blog post.' }); // Return error message
                  } else {
                    blog.title = req.body.title; // Save latest blog title
                    blog.body = req.body.body; // Save latest body
                    blog.save((err) => {
                      if (err) {
                        if (err.errors) {
                          res.json({ success: false, message: 'Please ensure form is filled out properly' });
                        } else {
                          res.json({ success: false, message: err }); // Return error message
                        }
                      } else {
                        res.json({ success: true, message: 'Blog Updated!' }); // Return success message
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
     }
  });

  router.delete('/deleteBlog/:id', (req, res) => {
    if (!req.params.id) {
      res.json({ success: false, message: 'No id provided' }); // Return error message
    } else {
      // check id in is database
      Blog.findOne({ _id: req.params.id }, (err, blog) => {
        // check any errors found
        if (err) {
          res.json({ success: false, message: 'Invalid id' }); // Return error message
        } else {
          // Check blog is in databse
          if (!blog) {
            res.json({ success: false, messasge: 'Blog was not found' }); // Return error message
          } else {
            // Check who is trying to delete blog post
            User.findOne({ _id: req.decoded.userId }, (err, user) => {
              if (err) {
                res.json({ success: false, message: err });
              } else {
                // Check that the user's ID was found in database
                if (!user) {
                  res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                } else {
                  // Check user is deleteing his own blog
                  if (user.username !== blog.createdBy) {
                    res.json({ success: false, message: 'You are not authorized to delete this blog post' });
                  } else {
                    // Blog removed from database
                    blog.remove((err) => {
                      if (err) {
                        res.json({ success: false, message: err });
                      } else {
                        res.json({ success: true, message: 'Blog deleted!' });
                      }
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
  });

  router.put('/likeBlog', (req, res) => {
  // Check if id was passed provided in request body
  if (!req.body.id) {
    res.json({ success: false, message: 'No id was provided.' });
  } else {
    // Search the database with id
    Blog.findOne({ _id: req.body.id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Invalid blog id' });
      } else {
        // Check if id matched the id of a blog post in the database
        if (!blog) {
          res.json({ success: false, message: 'Error, blog not found.' });
        } else {
          // Get logged in user data
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: 'Error, data not found.' });
            } else {
              // check user is in database
              if (!user) {
                res.json({ success: false, message: 'Error, user not found.' });
              } else {
                // Check if user is same as person that created blog
                if (user.username === blog.createdBy) {
                  res.json({ success: false, message: 'Dont be conceited!' });
                } else {
                  // check if user liked the post before
                  if (blog.likedBy.includes(user.username)) {
                    res.json({ success: false, message: 'You already liked this post.' });
                  } else {
                    // Check if user that like had dislike post previously
                    if (blog.dislikedBy.includes(user.username)) {
                      blog.dislikes--; // Increment dislikes by -1
                      const arrayIndex = blog.dislikedBy.indexOf(user.username); // Get the index of the username in the array for removal
                      blog.dislikedBy.splice(arrayIndex, 1); // Remove user from array
                      blog.likes++; // Increment likes by 1
                      blog.likedBy.push(user.username); // Add user to like list/array
                      // Save blog
                      blog.save((err) => {
                        if (err) {
                          res.json({ success: false, message: 'Something went wrong.' });
                        } else {
                          res.json({ success: true, message: 'Blog liked!' }); // Return success message
                        }
                      });
                    } else {
                      blog.likes++; // Incriment likes by 1
                      blog.likedBy.push(user.username); // Add user to Liked list/array
                      // Save blog post
                      blog.save((err) => {
                        if (err) {
                          res.json({ success: false, message: 'Something went wrong.' });
                        } else {
                          res.json({ success: true, message: 'Blog liked!' }); // Return success message
                        }
                      });
                    }
                  }
                }
              }
            }
          });
        }
      }
    });
  }
});

/* ===============================================================
   DISLIKE BLOG POST
=============================================================== */
router.put('/dislikeBlog', (req, res) => {
  // Check if id was provided inside the request body
  if (!req.body.id) {
    res.json({ success: false, message: 'No id was provided.' });
  } else {
    // Search database id of user
    Blog.findOne({ _id: req.body.id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Invalid blog id' });
      } else {
        // Check if blog post id was found in the database
        if (!blog) {
          res.json({ success: false, message: 'Error, blog not found.' });
        } else {
          // Get logged in users data
          User.findOne({ _id: req.decoded.userId }, (err, user) => {
            if (err) {
              res.json({ success: false, message: 'Error, user data not found.' });
            } else {
              // Check if user was found in the database
              if (!user) {
                res.json({ success: false, message: 'Error, user not found.' });
              } else {
                // Check if user who disliekd post is the same person who originated the blog post
                if (user.username === blog.createdBy) {
                  res.json({ success: false, messagse: 'Cannot dislike your own post.' });
                } else {
                  // Check if user disliked before
                  if (blog.dislikedBy.includes(user.username)) {
                    res.json({ success: false, message: 'You already disliked this post.' });
                  } else {
                    // Check if user disliked before
                    if (blog.likedBy.includes(user.username)) {
                      blog.likes--; // Decrease likes by one
                      const arrayIndex = blog.likedBy.indexOf(user.username); // Check where username is inside of the array
                      blog.likedBy.splice(arrayIndex, 1); // Remove username from index
                      blog.dislikes++; // Increment by 1
                      blog.dislikedBy.push(user.username); // Add username to list of dislikers
                      // Save blog data
                      blog.save((err) => {
                        if (err) {
                          res.json({ success: false, message: 'Error, dislike not registered' });
                        } else {
                          res.json({ success: true, message: 'Blog disliked!' }); // success
                        }
                      });
                    } else {
                      blog.dislikes++; // Increment by 1
                      blog.dislikedBy.push(user.username); // Add user to list of likers
                      // Save blog data
                      blog.save((err) => {
                        if (err) {
                          res.json({ success: false, message: 'Error, dislike not registered' });
                        } else {
                          res.json({ success: true, message: 'Blog disliked!' }); // Return success message
                        }
                      });
                    }
                  }
                }
              }
            }
          });
        }
      }
    });
  }
});

  return router;
};
