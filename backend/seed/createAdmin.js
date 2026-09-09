require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../config/db');

const createAdmin = async () => {
    const email = 'digisolunusanadmin@solusidigital.co.id';
    const plainPassword = 'Rakan1811';
    try {
        const [exist] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        const isExist = exist.length > 0;
        if (isExist) {
            console.log('This email is already exist.');
            process.exit(0);
        }
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        const [result] = await db.execute('INSERT INTO users (email, password, updated_at) VALUES (?, ?, NOW())', [email, hashedPassword]);
        console.log('New admin succesfully created');
        process.exit(0);
    } catch (err) {
        console.log('Error', err.message);
        process.exit(1);
    }
}

createAdmin();