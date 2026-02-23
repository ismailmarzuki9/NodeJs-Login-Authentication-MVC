const { validationResult } = require('express-validator');
const AuthService = require('../services/AuthService');

class AuthController {

    static showLogin(req, res) {
        res.render('auth/login', { errors: [] });
    }

    static async login(req, res) {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.render('auth/login', {
                errors: errors.array()
            });
        }

        const token = await AuthService.login(
            req.body.email,
            req.body.password
        );

        if (!token) {
            return res.render('auth/login', {
                errors: [{ msg: 'Email atau password salah' }]
            });
        }

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/users');
    }

    static async reqisterForm(req, res){
        res.render('auth/register', { errors : []});
    }

    static async storeRegister (req, res){
        console.log('DATA YANG DIKIRIM:', req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.render('auth/register', {
                errors : errors.array()
            });
        }

         try {
                await AuthService.register({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                // console.log(AuthService);
                // ✅ register sukses → login manual
                return res.redirect('login');

            } catch (error) {
                // return res.render('auth/register', {
                //     errors: [{ msg: 'Register gagal, email mungkin sudah digunakan' }]
                // });
                console.error('ERROR REGISTER:', error);
                return res.render('auth/register', {
                    errors: [{ msg: error.message }]
                });
            }
    }
}

module.exports = AuthController;
