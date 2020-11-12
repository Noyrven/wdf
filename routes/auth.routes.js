const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const passport = require('passport');


router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username
        });
        const registeredUser = await User.register(newUser, req.body.password);
        console.log('User ' + registeredUser.username + ' registred successfully');
        await passport.authenticate('local')(req, res, function () {
            console.log('User ' + req.user.username + ' authenticated with success');
            req.session.auth = req.isAuthenticated();
            res.json({
                user: req.user,
                authenticated: req.session.auth
            }).status(200).end()
        })
    } catch (err) {
        console.log(err)
    }
})


router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('User ' + req.user.username + ' logged in with success');
    req.session.auth = req.isAuthenticated();
    res.json({
        user: req.user,
        authenticated: req.session.auth
    }).status(200).end()
})


router.get('/logout', (req, res) => {
    req.logOut();
    req.session = null;
    console.log('User logged out')
    res.status(200).end()
})

module.exports = router;