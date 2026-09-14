const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body} = require('express-validator');
const validate = require('../middleware/validate');

const validateAll = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email wajib diisi')
        .isEmail().withMessage('Format email tidak valid')
        .isLength({ max: 255 }).withMessage('Email maksimal 255 karakter'),

    body('name')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 }).withMessage('Nama maksimal 100 karakter'),

    body('message')
        .trim()
        .notEmpty().withMessage('Pesan wajib diisi')
        .isLength({ max: 500 }).withMessage('Pesan maksimal 500 karakter'),
];

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM messages');
        return res.json(result);
    } catch (err) {
        return res.status(400).json({message: 'Failed to load'});
    }
});

router.post('/', validateAll, validate, async (req, res) => {
    try {
        const {email, name, message} = req.body;
        const query = 'INSERT INTO messages (email, name, message) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [email, name, message]);
        return res.json({message: 'Data inserted', insertedRows: result.affectedRows});
    } catch (err) {
        return res.status(400).json({message: 'Failed to load'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const messageId = req.params.id;
        const query = 'DELETE FROM messages WHERE id = ?';
        const [result] = await db.execute(query, [messageId]);
        return res.json({message: 'Data deleted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Failed to delete'});
    }
});

module.exports = router;