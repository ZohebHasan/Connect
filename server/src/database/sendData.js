const fs = require('fs');
const User = require('../models/user.jsx'); // Path to your Mongoose User model

// Assuming encrypted data is stored in 'encryptedData.json'
const encryptedData = JSON.parse(fs.readFileSync('encryptedData.json', 'utf8'));

const newUser = new User(encryptedData);

newUser.save()
    .then(user => console.log('User saved:', user))
    .catch(err => console.error('Error saving user:', err));
