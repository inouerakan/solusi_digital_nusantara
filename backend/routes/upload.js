const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const verifyToken = require('../middleware/verifyToken');

const ALLOWED_FOLDERS = ['gallery', 'products', 'services', 'articles'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = req.params.folder;

        if (!ALLOWED_FOLDERS.includes(folder)) {
            return cb(new Error('Folder tujuan tidak valid'));
        }

        const uploadPath = path.join(__dirname, `../../frontend/public/images/${folder}`);

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error('Hanya file gambar (jpg, jpeg, png, webp) yang diizinkan'));
        }
    }
});

router.post('/:folder', verifyToken, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({message: 'Tidak ada file yang diunggah'});
    }

    const imageUrl = `/images/${req.params.folder}/${req.file.filename}`;

    res.json({
        message: 'File berhasil diunggah',
        image_url: imageUrl
    });
});

router.use((err, req, res, next) => {
    if (err) {
        return res.status(400).json({message: err.message});
    }
    next();
});

module.exports = router;