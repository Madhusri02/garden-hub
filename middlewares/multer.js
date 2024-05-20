const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const parts = file.originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = file.originalname + '-' + Date.now() + '.' + ext;
        cb(null, newPath);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
