const { User, Pet, Feeder } = require('../models');

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
            req.session.sessionUserName = loginUserData.dataValues.first_name + " " + loginUserData.dataValues.last_name;
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
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
        });

        //console.log("Created User");
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.sessionUserId = createSignUpUser.dataValues.id;
            req.session.sessionUserName = createSignUpUser.dataValues.first_name + " " + createSignUpUser.dataValues.last_name;
            res.status(200).json({ user: createSignUpUser, message: 'You are now signed in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});