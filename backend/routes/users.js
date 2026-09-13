const express = require('express');
const router = express.Router();
const db = require('../config/db');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    message: 'Limit to login reached',
    statusCode: 429
});

const validateInput = [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Format email tidak valid'),
    body('password').notEmpty().withMessage('Password is required')
];

const validateInputFunc = (req, res, next) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json(validationResult(req).array()[0].msg);
    }
    next();
};

router.post('/register', verifyToken, validateInput, validateInputFunc, async (req, res) => {
    try {
        const {email, password} = req.body;
        const [exist] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        const isExist = exist.length > 0;
        if (isExist) {
            return res.status(400).json({message: 'Email is existed'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute('INSERT INTO users (email, password, updated_at) VALUES (?, ?, NOW())', [email, hashedPassword]);
        return res.json({message: 'Admin created', affectedRows: result.affectedRows});
    } catch (err) {
        return res.status(500).json({message: 'Failed to create'});
    }
});

router.post('/login', limiter, validateInput, validateInputFunc, async (req, res) => {
    try {
        const {email, password} = req.body;
        const query = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.query(query, [email]);
        if (result.length === 0) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const token = jsonwebtoken.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        return res.json({message: 'Login successful', token});
    } catch (err) {
        return res.status(500).json({error: 'Failed to login'});
    }
});

module.exports = router;