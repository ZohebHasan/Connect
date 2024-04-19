const fs = require('fs');
const path = require('path');

const schema = require('../inputUser.jsx');

fs.writeFileSync(path.join(__dirname, 'encryption/tempSensitive/user.json'), JSON.stringify(schema, null, 2), 'utf-8');
console.log('The schema has been successfully converted to JSON.');

