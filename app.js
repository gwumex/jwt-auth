const express = require('express');
const mongoose = require('mongoose');
const router = require('./route/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');
// database connection
const dbURI = 'mongodb://localHost:27017/express-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(router);

// app.get('/set-cookies', (req, res) => {

//   res.cookie("newUser", false);
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
//   res.send("cookie ste")
// })

// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;
//     res.json(cookies);
// }