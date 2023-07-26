const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/staff.model');

// authorize
router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // validate that fields entered correctly
    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all field' })
    }

    // check for user
    User.findOne({ username })
        .then( user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist' });

            // validate password
            bcrypt.compare(password, user.password)
                .then(match => {
                    if(!match) return res.status(400).json( { msg: 'Incorrect password' });

                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                auth: true,
                                token: token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                }
                            })
                        }
                    )
                })
        })
});

// check if validated
router.route('/user').get(auth, (req, res) => {
    res.send('You are authenticated');
})

module.exports = router;
