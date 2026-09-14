const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');
const verifyToken = require('../middleware/verifyToken');
const validate = require('../middleware/validate');

const validateAll = [
    body('statement').notEmpty().withMessage('Statement tidak boleh kosong').isLength({min: 3, max: 100}).withMessage('Panjang statement harus di antara 3 hingga 100 karakter'),
    body('description').notEmpty().withMessage('Statement tidak boleh kosong').isLength({min: 30, max: 500}).withMessage('Panjang deskripsi harus di antara 30 hingga 500 karakter')
];

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM vision';
        const [result] = await db.query(query);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.put('/:id', verifyToken, validateAll, validate, async (req, res) => {
    const visionId = req.params.id;
    const {statement, description} = req.body;
    try {
        const query = 'UPDATE vision SET statement = ?, description = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [statement, description, visionId]);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

module.exports = router;