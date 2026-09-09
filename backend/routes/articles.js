const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');

const validateAll = [
    body('title').isEmpty().withMessage('Title is required').isLength({min: 10, max:150}).withMessage('Length must be between 10 and 100 characters'),
    body('summary').isEmpty().withMessage('Summary is required').isLength({min: 30, max:300}).withMessage('Length must be between 30 and 300 characters'),
    body('content').isEmpty().withMessage('Content is required').isLength({min: 100, max:1000}).withMessage('Length must be between 100 and 1000 characters'),
    body('image_url').isEmpty().withMessage('Image is required').isLength({min: 3, max:255}).withMessage('Length must be between 3 and 255 characters'),
]

const validate = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({error: validationResult(req).array()});
    }
    next();
};

router.get('/', async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM articles');
        return res.json(result);
    } catch (err) {
        return res.status(500).json({message: 'Failed to load'});
    }
});

router.post('/', validateAll, validate, async (req, res) => {
    const {title, summary, content, image_url} = req.body;
    try {
        const query = 'INSERT INTO articles (title, summary, content, image_url, date) VALUES (?, ?, ?, ?, NOW())';
        const [result] = await db.execute(query, [title, summary, content, image_url]);
        return res.json({message: 'Data inserted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Failed to insert'});
    }
});

router.put('/:id', validateAll, validate, async (req, res) => {
    const articlesId = req.params.id;
    const {title, summary, content, image_url} = req.body;
    try {
        const query = 'UPDATE articles SET title = ?, summary = ?, content = ?, image_url = ?, updated_at = NOW() WHERE id = ?';
        const [result] = await db.execute(query, [title, summary, content, image_url, articlesId]);
        return res.json({message: 'Data updated', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to update'});
    }
});

router.delete('/:id', async (req, res) => {
    const articlesId = req.params.id;
    try {
        const query = 'DELETE FROM articles WHERE id = ?';
        const [result] = await db.execute(query, [articlesId]);
        return res.json({message: 'Data deleted', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Data failed to delete'});
    }
});

module.exports = router;