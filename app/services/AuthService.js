const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

class AuthService {

    static async register(data){
        const hashedPassword = await bcrypt.hash(data.password, 10);

        await UserModel.create({
            name : data.name,
            email : data.email,
            password : hashedPassword 
        });

        return true;
    }

    static async login (email, password) {
        const user = await UserModel.findByEmail(email);
        if (!user){
            return null;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return null;

        const token = jwt.sign(
            {id : user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES}
        );

        return token;
    }
}

module.exports = AuthService;