const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');

const validateAll = [
    body('statement').notEmpty().withMessage('Statement is required').isLength({min: 3, max: 30}).withMessage('Length must be between 3 and 30 characters'),
    body('description').notEmpty().withMessage('Description is required').isLength({min: 30, max: 500}).withMessage('Length must be between 30 and 500 characters')
];

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({error: validationResult(req).array()});
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM vision';
        const [result] = await db.query(query);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.put('/:id', validateAll, validate, async (req, res) => {
    const visionId = req.params.id;
    const {statement, description} = req.body;
    try {
        const query = 'UPDATE visions SET statement = ?, description = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [statement, description, visionId]);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

module.exports = router;