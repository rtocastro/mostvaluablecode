const { User, Comment, Blog } = require('../models');
const express = require('express')
const router = require('express').Router();


// Router to display Login page
router.get('/', async( req, res) =>{
    res.render('login');
});


// Router to check whether the login user is valid user or not
router.post('/login', async (req, res) => { 
    try {
        const loginUserData = await User.findOne({
            where: {
                username: req.body.signinemail
            }
        });

        if (!loginUserData) {
            res.status(404).json({ "message": "No matching username/password" });
            return;
        }

        const validPassword = await loginUserData.checkPassword(req.body.signinpass);

        if (!validPassword) {
            res.status(400).json({ "message": "You entered the wrong password/username" });
            return;
        }
        
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.sessionUserId = loginUserData.dataValues.id;
            res.status(200).json({ user: loginUserData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(500).json(err);
    }
});


// Router for signup functionality
router.post('/signup', async (req, res) => { 
    try {
        //console.log("User Details===", {...req.body});
        const createSignUpUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        //console.log("Created User");
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.sessionUserId = createSignUpUser.dataValues.id;
            res.status(200).json({ user: createSignUpUser, message: 'You are now signed in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Router for the homepage and Router to get all the Pet profile info
router.get('/homepage', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                id: req.session.sessionUserId,
            }
        });
        const userData = blogData.map(blog => blog.get({ plain: true })); 
        res.render('homepage', {userData, loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
    } catch (err) {
        res.status(500).json(err);
    }
});

//Route to render the profile handlebar
router.get('/profile', async (req, res) => {
    res.render('profile', {loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
});

//Route to render the dev handlebar
router.get('/dev', async (req, res) => {
    res.render('dev', {loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
});


module.exports = router;