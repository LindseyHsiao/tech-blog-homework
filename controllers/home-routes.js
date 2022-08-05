// This file will contain all of the user-facing routes, 
//such as the homepage and login page.

const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    include: [User]
  })
    .then(dbPostData => {
      const posts = dbPostData.map((post) => post.get({ plain: true }))
      console.log(posts)
      // pass a single post object into the homepage template
      res.render('homepage', {posts, loggedIn: req.session.loggedIn});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  });
  
  router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: [User, {
        model: Comment,
        include: [User]
      }]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }

        // serialize the data
        const post = dbPostData.get({ plain: true });

        // pass data to template
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('signup')
})
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return
  }
  res.render('login')
})



module.exports = router;
