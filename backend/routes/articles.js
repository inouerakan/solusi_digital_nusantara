const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');
const verifyToken = require('../middleware/verifyToken');
const deleteFile = require('../utils/deleteFile');
const validate = require('../middleware/validate');

const validateAll = [
    body('title').notEmpty().withMessage('Judul tidak boleh kosong').isLength({min: 10, max: 150}).withMessage('Panjang judul harus di antara 10 hingga 150 karakter'),
    body('summary').notEmpty().withMessage('Rangkuman tidak boleh kosong').isLength({min: 30, max: 300}).withMessage('Panjang rangkuman harus di antara 30 hingga 300 karakter'),
    body('content').notEmpty().withMessage('Konten tidak boleh kosong').isLength({min: 100, max: 10000}).withMessage('Panjang konten harus di antara 100 hingga 10000 karakter'),
    body('image_url').notEmpty().withMessage('Path tidak boleh kosong').isLength({min: 3, max: 255}).withMessage('Panjang path harus di antara 3 hingga 255 karakter'),
];

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM articles');
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.get('/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        const query = 'SELECT * FROM articles WHERE id = ?';
        const [result] = await db.query(query, [articleId]);
        return res.json(result[0])
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.post('/', verifyToken, validateAll, validate, async (req, res) => {
    const {title, summary, content, image_url} = req.body;
    try {
        const query = 'INSERT INTO articles (title, summary, content, image_url, date) VALUES (?, ?, ?, ?, NOW())';
        const [result] = await db.execute(query, [title, summary, content, image_url]);
        return res.json({message: 'Data inserted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Failed to insert'});
    }
});

router.put('/:id', verifyToken, validateAll, validate, async (req, res) => {
    const articleId = req.params.id;
    const {title, summary, content, image_url} = req.body;
    try {
        const [oldImage] = await db.query('SELECT image_url FROM articles WHERE id = ?', [articleId]);
        if (oldImage.length === 0) {
            return res.status(404).json({message: 'Data tidak ditemukan'});
        }
        const query = 'UPDATE articles SET title = ?, summary = ?, content = ?, image_url = ?, date = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [title, summary, content, image_url, articleId]);
        if (oldImage[0].image_url != image_url) deleteFile(oldImage[0].image_url);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    const articleId = req.params.id;
    try {
        const [oldImage] = await db.query('SELECT image_url FROM articles WHERE id = ?', [articleId]);
        if (oldImage.length === 0) {
            return res.status(404).json({message: 'Data tidak ditemukan'});
        }
        const query = 'DELETE FROM articles WHERE id = ?';
        const [result] = await db.execute(query, [articleId]);
        deleteFile(oldImage[0].image_url);
        return res.json({message: 'Data deleted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to delete'});
    }
});

module.exports = router;