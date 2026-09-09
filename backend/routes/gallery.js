const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const db = require('../config/db');

const validateAll = [
    body('title').notEmpty().withMessage('Title is required').isLength({min: 3, max: 100}).withMessage('Length must be between 3 and 100 characters'),
    body('image_url').notEmpty().withMessage('Image is required').isLength({min: 3, max: 255}).withMessage('Length must be between 3 and 255 characters')
];

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({error: validationResult(req).array()});
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

router.post('/', validateAll, validate, async (req, res) => {
    const {title, image_url} = req.body;
    try {
        const query = 'INSERT INTO gallery (title, image_url, updated_at) VALUES (?, ?, NOW())';
        const [result] = await db.execute(query, [title, image_url]);
        return res.json({message: 'Data inserted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Failed to insert'});
    }
});

router.put('/:id', validateAll, validate, async (req, res) => {
    const galleryId = req.params.id;
    const {title, image_url} = req.body;
    try {
        const query = 'UPDATE gallery SET title = ?, image_url = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [title, image_url, galleryId]);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

router.delete('/:id', async (req, res) => {
    const galleryId = req.params.id;
    try {
        const query = 'DELETE FROM gallery WHERE id = ?';
        const [result] = await db.execute(query, [galleryId]);
        return res.json({message: 'Data deleted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to delete'});
    }
});

module.exports = router;