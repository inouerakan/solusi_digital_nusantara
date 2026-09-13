const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const db = require('../config/db');
const verifyToken = require('../middleware/verifyToken');
const deleteFile = require('../utils/deleteFile');

const validateAll = [
    body('title').notEmpty().withMessage('Judul tidak boleh kosong').isLength({min: 3, max: 100}).withMessage('Panjang judul harus di antara 3 hingga 100 karakter'),
    body('image_url').notEmpty().withMessage('Path tidak boleh kosong').isLength({min: 3, max: 255}).withMessage('Panjang path harus di antara 3 hingga 255 karakter')
];

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({message: validationResult(req).array()[0].msg});
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM gallery');
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.post('/', verifyToken, validateAll, validate, async (req, res) => {
    const {title, image_url} = req.body;
    try {
        const query = 'INSERT INTO gallery (title, image_url, updated_at) VALUES (?, ?, NOW())';
        const [result] = await db.execute(query, [title, image_url]);
        return res.json({message: 'Data inserted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Failed to insert'});
    }
});

router.put('/:id', verifyToken, validateAll, validate, async (req, res) => {
    const galleryId = req.params.id;
    const {title, image_url} = req.body;
    try {
        const [oldImage] = await db.query('SELECT image_url FROM gallery WHERE id = ?', [galleryId]);
        if (oldImage.length === 0) {
            return res.status(404).json({message: 'Data tidak ditemukan'});
        }
        const query = 'UPDATE gallery SET title = ?, image_url = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [title, image_url, galleryId]);
        if (oldImage[0].image_url != image_url) deleteFile(oldImage[0].image_url);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    const galleryId = req.params.id;
    try {
        const [oldImage] = await db.query('SELECT image_url FROM gallery WHERE id = ?', [galleryId]);
        if (oldImage.length === 0) {
            return res.status(404).json({message: 'Data tidak ditemukan'});
        }
        const query = 'DELETE FROM gallery WHERE id = ?';
        const [result] = await db.execute(query, [galleryId]);
        deleteFile(oldImage[0].image_url);
        return res.json({message: 'Data deleted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to delete'});
    }
});

module.exports = router;