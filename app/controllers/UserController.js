const { validationResult } = require('express-validator');
const UserService = require('../services/UserService');

class UserController {

    static async index(req, res) {
        const users = await UserService.getAllUsers();
        res.render('users/index', { users });
    }

    static createForm(req, res) {
        res.render('users/create', { errors: [] });
    }

    static async store(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('users/create', {
                errors: errors.array()
            });
        }

        await UserService.createUser(req.body);
        res.redirect('/users');
    }

    
}

module.exports = UserController;
