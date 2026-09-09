const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');

const validateAll = [
    body('year').notEmpty().withMessage('Year is required').isLength({min: 4, max: 4}).withMessage('Length must be between 4  characters'),
    body('title').notEmpty().withMessage('Title is required').isLength({min: 3, max: 30}).withMessage('Length must be between 3 and 30 characters'),
    body('description').notEmpty().withMessage('Description is required').isLength({min: 30, max: 300}).withMessage('Length must be between 30 and 300 characters')
];

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({error: validationResult(req).array()});
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM history';
        const [result] = await db.query(query);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.post('/', validateAll, validate, async (req, res) => {
    const {year, title, description} = req.body;
    try {
        const query = 'INSERT INTO history (year, title, description, updated_at) VALUES (?, ?, ?, NOW())';
        const [result] = await db.execute(query, [year, title, description]);
        return res.json({message: 'Data inserted'});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to insert'});
    }
});

router.put('/:id', validateAll, validate, async (req, res) => {
    const historyId = req.params.id;
    const {year, title, description} = req.body;
    try {
        const query = 'UPDATE history SET year = ?, title = ?, description = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [year, title, description, historyId]);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

router.delete('/:id', async (req, res) => {
    const historyId = req.params.id;
    try {
        const query = 'DELETE FROM history WHERE id = ?';
        const [result] = await db.execute(query, [historyId]);
        return res.json({message: 'Data deleted'});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to delete'});
    }
});

module.exports = router;