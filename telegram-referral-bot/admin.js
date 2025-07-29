const express = require('express');
const User = require('./models/User');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    req.session.admin = true;
    res.redirect('/admin');
  } else {
    res.send('❌ Wrong password');
  }
});

router.get('/admin', async (req, res) => {
  if (!req.session.admin) return res.redirect('/login');
  const users = await User.find();
  res.render('admin', { users });
});

module.exports = router;