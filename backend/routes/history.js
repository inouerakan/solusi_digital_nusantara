const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');
const verifyToken = require('../middleware/verifyToken');

const validateAll = [
    body('year').notEmpty().withMessage('Tahun tidak boleh kosong').isLength({min: 4, max: 4}).withMessage('Panjang tahun harus 4 karakter'),
    body('title').notEmpty().withMessage('Judul tidak boleh kosong').isLength({min: 3, max: 30}).withMessage('Panjang judul harus di antara 3 hingga 30 karakter'),
    body('description').notEmpty().withMessage('Deskripsi tidak boleh kosong').isLength({min: 30, max: 300}).withMessage('Panjang deskripsi harus di antara 30 hingga 300 karakter')
];

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({message: validationResult(req).array()[0].msg});
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

router.post('/', verifyToken, validateAll, validate, async (req, res) => {
    const {year, title, description} = req.body;
    try {
        const query = 'INSERT INTO history (year, title, description, updated_at) VALUES (?, ?, ?, NOW())';
        const [result] = await db.execute(query, [year, title, description]);
        return res.json({message: 'Data inserted'});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to insert'});
    }
});

router.put('/:id', verifyToken, validateAll, validate, async (req, res) => {
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

router.delete('/:id', verifyToken, async (req, res) => {
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