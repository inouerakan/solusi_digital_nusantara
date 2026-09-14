const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');
const verifyToken = require('../middleware/verifyToken');
const deleteFile = require('../utils/deleteFile');
const validate = require('../middleware/validate');

const validateAll = [
    body('name').notEmpty().withMessage('Nama tidak boleh kosong').isLength({min: 10, max: 100}).withMessage('Panjang nama harus di antara 10 hingga 100 karakter'),
    body('description').notEmpty().withMessage('Deskripsi tidak boleh kosong').isLength({min: 30, max: 300}).withMessage('Panjang deskripsi harus di antara 30 hingga 300 karakter'),
    body('content').notEmpty().withMessage('Konten tidak boleh kosong'),
    body('image_url').notEmpty().withMessage('Path tidak boleh kosong').isLength({min: 3, max: 255}).withMessage('Panjang path harus di antara 3 hingga 255 karakter'),
];

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM products');
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.post('/', verifyToken, validateAll, validate, async (req, res) => {
    const { name, description, content, image_url } = req.body;
    try {
        const query = 'INSERT INTO products (name, description, content, image_url, updated_at) VALUES (?, ?, ?, ?, NOW())';
        const [result] = await db.query(query, [name, description, content, image_url]);
        return res.json({message: 'Insert successfully', affectedRows: result.affectedRows});
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: 'Internal server error'});
    }
});

router.put('/:id', verifyToken, validateAll, validate, async (req, res) => {
    const productId = req.params.id;
    const { name, description, content, image_url } = req.body;
    try {
        const [oldImage] = await db.query('SELECT image_url FROM products WHERE id = ?', [productId]);
        if (oldImage.length === 0) {
            return res.status(404).json({message: 'Data tidak ditemukan'});
        }
        const query = `UPDATE products SET name = ?, description = ?, content = ?, image_url = ?, updated_at = NOW() WHERE id = ?`;
        const [result] = await db.query(query, [name, description, content, image_url, productId]);
        if (oldImage[0].image_url != image_url) deleteFile(oldImage[0].image_url);
        return res.json({ message: 'Updated successfully', affectedRows: result.affectedRows });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    const productId = req.params.id;
    try {
        const [oldImage] = await db.query('SELECT image_url FROM products WHERE id = ?', [productId]);
        if (oldImage.length === 0) {
            return res.status(404).json({message: 'Data tidak ditemukan'});
        }
        const query = 'DELETE FROM products WHERE id = ?';
        const [result] = await db.execute(query, [productId]);
        deleteFile(oldImage[0].image_url);
        return res.json({ message: 'Deleted successfully', affectedRows: result.affectedRows });
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;