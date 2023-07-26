const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Staff = require('../models/staff.model');
const Customer = require('../models/customer.model');
const auth = require('../middleware/auth')

// register new staff member
router.route('/register-staff').post(auth, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).assignSocket({ msg: 'Please enter all field' })
    }

    Staff.findOne({ username })
        .then( staff => {
            if (staff) return res.status(400).json({ msg: 'User already exists' });

            const newStaff = new Staff({
                username,
                password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newStaff.password, salt, (error, hash) => {
                    if(error) throw error;
                    newStaff.password = hash;
                    newStaff.save()
                        .then(staff => {
                            jwt.sign(
                                { id: staff.id },
                                process.env.JWT_SECRET,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        staff: {
                                            id: user.id,
                                            username: user.username,
                                        }
                                    })
                                }
                            )
                        });
                });
            });
        })
});

// update staff member
router.route('/update-staff').post(auth, (req, res) => {
    const username = req.body.username;

    if (!username) res.status(400).json( {msg: 'Enter all fields'});

    Staff.findOne( {username} )
        .then(staff => {
            staff.username = req.body.newUsername;
            staff.password = req.body.newPassword;
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(staff.password, salt, (error, hash) => {
                    if(error) throw error;
                    staff.password = hash;
                    staff.save()
                        .then(() => res.json('Staff member updated.'))
                        .catch(err => res.status(400).json('Error' + err));
                })
            })
        })
})

// delete staff member
router.route('/delete-staff').delete(auth, (req, res) => {
    const username = req.body.username;

    if (!username) res.status(400).json( {msg: 'Enter all fields' });

    Staff.findOneAndDelete({username})
        .then(() => res.json('Staff member deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

// create client
router.route('/create-client').post(auth, (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    if (!name || !email) res.status(400).json( {msg: 'Please enter all fields'} )

    Customer.findOne({email})
        .then( user => {
            if (user) return res.status(400).json('Customer already exists')

            const newCustomer = new Customer ({
                name,
                email
            });

            newCustomer.save()
        });
});

// read all client
router.route('/get-all-client').get(auth, (req, res) => {
    Customer.find()
        .then(users => res.send(users))
        .catch(err => res.status(400).json('Error' + err));
})

// get one client
router.route('/get-client').post(auth, (req, res) => {
    const email = req.body.email;

    Customer.findOne({email})
        .then(customer => {
            res.send(customer)
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

// update client
router.route('/update-client').post(auth, (req, res) => {
    const email = req.body.email;

    Customer.findOne({email})
        .then(customer => {
            customer.email = req.body.newEmail;

            customer.save()
                .then(res.json('Customer updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        });
});

// delete client
router.route('/delete-client').delete(auth, (req, res) => {
    const email = req.body.email;

    if (!email) res.status(400).json('Please enter all fields')

    Customer.findOneAndDelete({email})
        .then(res.json('Customer deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

// add report
router.route('/add-report').post(auth, (req, res) => {
    const report = req.body.report
    const email = req.body.email

    if (!email || !report) res.status(400).json('Please enter all fields');

    Customer.findOne({email})
        .then(customer => {
            customer.reports.push(report);

            customer.save()
                .then(res.json('Customer updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
})

module.exports = router;
