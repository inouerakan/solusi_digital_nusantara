const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');
const verifyToken = require('../middleware/verifyToken');

const validateAll = [
    body('name').notEmpty().withMessage('Nama tidak boleh kosong').isLength({min: 3, max: 100}).withMessage('Panjang deskripsi harus di antara 3 hingga 100 karakter'),
    body('description').notEmpty().withMessage('Deskripsi tidak boleh kosong').isLength({min: 30, max: 300}).withMessage('Panjang deskripsi harus di antara 30 hingga 300 karakter'),
];

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({message: validationResult(req).array()[0].msg});
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

router.post('/', verifyToken, validateAll, validate, async (req, res) => {
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

router.put('/:id', verifyToken, validateAll, validate, async (req, res) => {
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

router.delete('/:id', verifyToken, async (req, res) => {
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