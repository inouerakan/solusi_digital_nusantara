const fs = require('fs');
const path = require('path');

function deleteImageFile(imageUrl) {
    if (!imageUrl) return;
    const imagePath = path.join(__dirname, '../../frontend/public', imageUrl);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }
}

module.exports = deleteImageFile;