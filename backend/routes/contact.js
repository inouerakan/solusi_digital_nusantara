const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');

const validateAll = [
    body('address').notEmpty().withMessage('Statement is required').isLength({min: 10, max: 255}).withMessage('Length must be between 10 and 255 characters'),
    body('phone_number').notEmpty().withMessage('Phone Number is required').isLength({min: 10, max: 15}).withMessage('Length must be between 30 and 15 characters'),
    body('email').notEmpty().withMessage('Email is required').isLength({min: 3, max: 100}).withMessage('Length must be between 3 and 100 characters'),
    body('latitude').notEmpty().withMessage('Latitude is required'),
    body('longitude').notEmpty().withMessage('Longitude is required')
];

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({error: validationResult(req).array()});
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM contact LIMIT 1';
        const [result] = await db.query(query);
        return res.json(result[0]);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.put('/:id', validateAll, validate, async (req, res) => {
    const contactId = req.params.id;
    const {address, phone_number, email, latitude, longitude} = req.body;
    try {
        const query = 'UPDATE contact SET address = ?, phone_number = ?, email = ?, latitude = ?, longitude = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [address, phone_number, email, latitude, longitude, contactId]);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

module.exports = router;