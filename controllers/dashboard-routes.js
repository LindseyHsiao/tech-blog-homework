const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth =  require('../utils/auth')

router.get('/', withAuth, (req, res)=>{ 
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }
      })
        .then(dbPostData => {
          const posts = dbPostData.map((post) => post.get({ plain: true }))
          console.log(posts)
          // pass a single post object into the homepage template
          res.render('dashboard', {posts, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})



//Edit Route for editing your posts and handlebar form for submit (js)
router.get('/edit/:id', withAuth, (req, res) => { 
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports =  router;