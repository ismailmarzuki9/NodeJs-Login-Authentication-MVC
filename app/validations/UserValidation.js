const { body } = require('express-validator');

exports.createUser = [
    body('name')
        .notEmpty().withMessage('Nama wajib diisi'),
    body('email')
        .isEmail().withMessage('Email tidak valid')
];
