const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

const Car = require('../models/car');

const validations = [
    check('year')
        .trim()
        .isInt({ min: 1885 })
        .escape()
        .withMessage('A year is required. Min year starts from 1885.'),
    check('brand')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('A brand is required.'),
    check('model')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("A model is required.")
];

// /api/cars => GET (index)
router.get('/cars', (req, res) => {
    Car.findAll().then(cars => {
        res.status(200).json({ cars });
    }).catch(err => {
        res.status(400).json({error: err.message })
    });
});

// /api/cars => POST (create)
router.post('/cars', validations, async (req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors })
        }

        Car.create(
            {
                brand: req.body.brand,
                model: req.body.model,
                year: req.body.year,
                user_id: req.body.user_id
            }
        ).then(result => {
            console.log('Car created!')
            res.status(201).json({ result })
        }).catch(err => {
            res.status(400).json({error: err.message })
        });
    } catch (e) {
        res.status(400).json({message: 'Sorry, something went wrong:('})
    }
});

// /api/cars/:id => GET (show)
router.get('/cars/:id', (req, res) => {
    Car.findByPk(req.params.id).then(car => {
        res.status(200).json({ car })
    }).catch(err => {
        res.status(400).json({error: err.message })
    });
});

// /api/cars/:id PUT (update)
router.put('/cars/:id', (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors})
        }

        Car.findByPk(req.params.id)
            .then(car => {
                car.brand = req.body.brand;
                car.model = req.body.model;
                car.year = req.body.year
                car.user_id = req.body.user_id
                return car.save();
            })
            .then(() => {
                res.status(200).json({message: `Car id: ${req.params.id} updated!`});
            })
            .catch(err => {
                res.status(400).json({error: err.message})
            });
    } catch (e) {
        res.status(400).json({message: 'Sorry, something went wrong:('})
    }
});

// /api/cars/:id DELETE (destroy)
router.delete('/cars/:id', (req, res) => {
    Car.findByPk(req.params.id)
        .then(car => {
            return car.destroy();
        })
        .then(() => {
            res.status(200).json({message: `Car id: ${req.params.id} destroyed!`});
        })
        .catch(err => {
            res.status(400).json({ error: err.message })
        });
});

module.exports = router;
