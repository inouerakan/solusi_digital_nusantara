const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');
const verifyToken = require('../middleware/verifyToken');

const validateAll = [
    body('address').notEmpty().withMessage('Alamat tidak boleh kosong').isLength({min: 10, max: 255}).withMessage('Panjang alamat harus di antara 10 hingga 255 karakter'),
    body('phone_number').notEmpty().withMessage('Nomor telepon tidak boleh kosong').isLength({min: 10, max: 15}).withMessage('Panjang nomor telepon harus di antara 10 hingga 15 karakter'),
    body('email').notEmpty().withMessage('Email tidak boleh kosong').isEmail().withMessage('Format email tidak valid'),
    body('instagram').notEmpty().withMessage('Instagram tidak boleh kosong'),
    body('youtube').notEmpty().withMessage('Yotube tidak boleh kosong'),
    body('tiktok').notEmpty().withMessage('TikTok tidak boleh kosong'),
    body('latitude').notEmpty().withMessage('Latitude tidak boleh kosong').isFloat().withMessage('Latitude harus berupa angka'),
    body('longitude').notEmpty().withMessage('Longitude tidak boleh kosong').isFloat().withMessage('Longitude harus berupa angka')
];

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({message: validationResult(req).array()[0].msg});
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM contact';
        const [result] = await db.query(query);
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.put('/:id', verifyToken, validateAll, validate, async (req, res) => {
    const contactId = req.params.id;
    const {address, phone_number, email, instagram, youtube, tiktok, latitude, longitude} = req.body;
    try {
        const query = 'UPDATE contact SET address = ?, phone_number = ?, email = ?, instagram = ?, youtube = ?, tiktok = ?, latitude = ?, longitude = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [address, phone_number, email, instagram, youtube, tiktok, latitude, longitude, contactId]);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

module.exports = router;