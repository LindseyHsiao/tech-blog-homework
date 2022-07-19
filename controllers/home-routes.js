// This file will contain all of the user-facing routes, 
//such as the homepage and login page.

const router = require('express').Router();

router.get('/', (req, res) => { //looks for index and renders hompage.handlebars
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });
});

router.get('/signup', (req, res)=> {
  if(req.session.loggedIn){
    res.redirect('/')
    return
  }
  res.render('signup')
})
router.get('/login', (req, res)=> {
  if(req.session.loggedIn){
    res.redirect('/')
    return
  }
  res.render('login')
})



module.exports = router;
