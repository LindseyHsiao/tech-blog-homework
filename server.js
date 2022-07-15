const path = require('path');
const express = require('express');
// import sequelize connection
const sequelize = require('./config/connection');

const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

//set Handlebars st template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//styles
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});




