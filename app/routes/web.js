const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const UserValidation = require('../validations/UserValidation');

const AuthController = require('../controllers/AuthController');
const AuthValidation = require('../validations/AuthValidation');
const auth = require('../middlewares/auth')

// router.get('/users', UserController.index);
router.get('/users/create', UserController.createForm);
router.post('/users', UserValidation.createUser, UserController.store);

router.get('/login', AuthController.showLogin);
router.post('/login', AuthValidation.login, AuthController.login);
router.get('/users', auth, UserController.index);
router.get('/register', AuthController.reqisterForm);
router.post('/register', AuthValidation.register, AuthController.storeRegister);

module.exports = router;
