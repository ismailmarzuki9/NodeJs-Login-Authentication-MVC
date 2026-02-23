const db = require('../../config/database');

class UserModel { // nama class pada model harus sama dengan nama file
    static async all(){
        const [rows] = await db.query('Select * From users');
        return rows;
    }

    static async create (data) {
        const sql = 'INSERT INTO users (name, email, password) VALUES(?, ?, ?)';
        await db.query(sql, [data.name, data.email, data.password]);
    }

    static async findByEmail(email) { // mencari email yang ada di db berdasrakan email yang di input user saat login
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [email]
        );
        return rows[0];
    }
}

module.exports= UserModel;