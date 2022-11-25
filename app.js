const express = require('express');
const mongoose = require('mongoose');
const router = require('./route/authRoutes')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

app.use(router);
// view engine
app.set('view engine', 'ejs');
// database connection
const dbURI = 'mongodb://localHost:27017/express-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));