const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const Car = require('../models/car');
const User = require('../models/user');

const validations = [
    check('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('A name is required'),
    check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('A valid email address is required'),
    check('age')
        .trim()
        .isInt({ min: 18 })
        .escape()
        .withMessage("A age is required. Age can't less than 18"),
];

// /api/users => GET (index)
router.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.status(200).json({ users });
    }).catch(err => {
        res.status(400).json({error: err.message })
    });
});

// /api/user => POST (create)
router.post('/users', validations, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors })
        }

        User.create(
            {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        ).then(result => {
            console.log('User created!')
            res.status(201).json({ result })
        }).catch(err => {
            res.status(400).json({error: err.message })
        });
    }catch (e) {
        res.status(400).json({message: 'Sorry, something went wrong:('})
    }
});

// /api/users/:id => GET (show)
router.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        Car.findAll({ where: { user_id: user.id }})
            .then(cars => {
                res.status(200).json({ user, userCars: cars })
            }).catch(err => { console.log(err)})
    }).catch(err => {
        res.status(400).json({error: err.message })
    });
});

// /api/cars/:id PUT (update)
router.put('/users/:id', validations, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors})
        }

        User.findByPk(req.params.id)
            .then(user => {
                user.name = req.body.name;
                user.email = req.body.email;
                user.age = req.body.age
                return user.save();
            })
            .then(() => {
                res.status(200).json({message: `User id: ${req.params.id} updated!`});
            })
            .catch(err => {
                res.status(400).json({error: err.message})
            });
    }catch (e) {
        res.status(400).json({error: err.message})
    }
});

// /api/cars/:id DELETE (destroy)
router.delete('/users/:id', (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            return user.destroy();
        })
        .then(() => {
            res.status(200).json({message: `User id: ${req.params.id} destroyed!`});
        })
        .catch(err => {
            res.status(400).json({ error: err.message })
        });
});

module.exports = router;
