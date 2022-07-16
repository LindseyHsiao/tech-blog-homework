// This file will contain all of the user-facing routes, 
//such as the homepage and login page.

const router = require('express').Router();

router.get('/', (req, res) => { //looks for index and renders hompage.handlebars
  res.render('homepage');
});



module.exports = router;
