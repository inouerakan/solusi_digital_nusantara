const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');

const validateAll = [
    body('name').isEmpty().withMessage('Name is required').isLength({min: 10, max:100}).withMessage('Length must be between 10 and 100 characters'),
    body('description').isEmpty().withMessage('Description is required').isLength({min: 30, max:300}).withMessage('Length must be between 30 and 300 characters'),
]

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({error: validationResult(req).array()});
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM core_values');
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.post('/', validateAll, validate, async (req, res) => {
    const { name, description } = req.body;
    try {
        const query = 'INSERT INTO core_values (name, description, updated_at) VALUES (?, ?, NOW())';
        const [result] = await db.query(query, [name, description]);
        return res.json({message: 'Insert successfully', affectedRows: result.affectedRows});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Internal server error'});
    }
});

router.put('/:id', validateAll, validate, async (req, res) => {
    const valueId = req.params.id;
    const { name, description } = req.body;
    try {
        const query = `UPDATE core_values SET name = ?, description = ?, updated_at = NOW() WHERE id = ?`;
        const [result] = await db.query(query, [name, description, valueId]);
        return res.json({ message: 'Updated successfully', affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const valueId = req.params.id;
    try {
        const query = 'DELETE FROM core_values WHERE id = ?';
        const [result] = await db.execute(query, [valueId]);
        return res.json({ message: 'Deleted successfully', affectedRows: result.affectedRows });
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;