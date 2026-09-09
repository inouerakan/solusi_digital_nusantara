const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');

const validateAll = [
    body('title').notEmpty().withMessage('Statement is required').isLength({min: 3, max: 30}).withMessage('Length must be between 3 and 30 characters'),
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
        const [rows] = await db.query('SELECT * FROM missions');
        return res.json(rows);
    } catch (err) {
        return res.status(500).json({message: 'Error inside server'})
    };
});

router.post('/', validateAll, validate, async (req, res) => {
    const {title, description} = req.body;
    try {
        const query = 'INSERT INTO missions (title, description, updated_at) VALUES (?, ?, NOW())';
        const [result] = await db.execute(query, [title, description]);
        return res.json({message: 'Data inserted'});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to insert'});
    }
});

router.put('/:id', validateAll, validate, async (req, res) => {
    const missionId = req.params.id;
    const {title, description} = req.body;
    try {
        const query = 'UPDATE missions SET title = ?, description = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [title, description, missionId]);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows})
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

router.delete('/:id', async (req, res) => {
    const missionId = req.params.id;
    try {
        const query = 'DELETE FROM missions WHERE id = ?';
        const [result] = db.execute(query, [missionId]);
        return res.json({message: 'Data deleted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to delete'});
    }
});

module.exports = router;