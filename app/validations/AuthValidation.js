const { body } = require('express-validator');

exports.login = [
    body('email')
        .isEmail().withMessage('Email tidak valid'),
    body('password')
        .notEmpty().withMessage('Password wajib diisi')
];

exports.register = [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 4 })
];
