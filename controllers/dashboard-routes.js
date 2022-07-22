const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth =  require('../utils/auth')

router.use('/', withAuth, (req, res)=>{ //why not router.get?
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
      })
        .then(dbPostData => {
          const posts = dbPostData.map((post) => post.get({ plain: true }))
          // pass a single post object into the homepage template
          res.render('dashboard', {posts, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})

//New Route for new posts needs to have a handlebar form for submit and (js)

//Edit Route for editing your posts and handlebar form for submit (js)

module.exports =  router;