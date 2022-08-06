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
          // pass a single post object into the homepage template
          res.render('dashboard', {posts, loggedIn: req.session.loggedIn});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
})



//Edit Route for editing your posts 
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

router.get('/new', withAuth, (req, res)=>{
  res.render('new-post', {loggedIn:req.session.loggedIn})
})

module.exports =  router;