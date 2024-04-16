const fs = require('fs');
const babel = require('@babel/core');

const jsxFilePath = 'server/src/user.jsx';
const outputJsonPath = 'server/src/encryption/user.json';

// Read the JSX file
const jsxContent = fs.readFileSync(jsxFilePath, 'utf8');

// Transform JSX to JavaScript using Babel
const transformed = babel.transformSync(jsxContent, {
    presets: ['@babel/preset-react'],
    plugins: [
        // Convert to an object structure directly executable by JavaScript
        '@babel/plugin-transform-react-jsx',
    ],
});

// Optional: You might want to further process `transformed.code` to fit your needs

// For demonstration, save the transformed code directly
fs.writeFileSync(outputJsonPath, JSON.stringify({ code: transformed.code }));
