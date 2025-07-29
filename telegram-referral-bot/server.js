require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bot = require('./bot');
const adminRoutes = require('./admin');

const app = express();
mongoose.connect(process.env.MONGO_URI);

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use('/', adminRoutes);

bot.launch();
app.listen(3000, () => console.log('Admin panel running at http://localhost:3000'));