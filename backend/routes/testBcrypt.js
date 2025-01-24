const bcrypt = require('bcryptjs');

const testPassword = '12345';
const storedHash = '$2a$10$rKGb4F5Aucug4ADAinA4CuZc3MNSPchzNcqh2yMRKX.DuHxGevYrW';

// Verify if the password matches the hash
bcrypt.compare(testPassword, storedHash, (err, isMatch) => {
    if (err) throw err;
    console.log('Password match result:', isMatch);  // Should be true if the password matches
});

