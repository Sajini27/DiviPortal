const bcrypt = require('bcryptjs');

const password = '12345';
bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) throw err;
    console.log('Hashed password:', hashedPassword);
});

