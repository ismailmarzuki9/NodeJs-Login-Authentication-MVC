const UserModel = require('../models/UserModel');

class UserService {
    static async getAllUsers() {
        return await UserModel.all();
    }

    static async createUser(data) {
        await UserModel.create(data);
    }
}

module.exports = UserService;
