"use strict";
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({
    keyFilename: '<KEY_FILE>'
});
client
    .labelDetection('<IMAGE_PATH>')
    .then((results) => {
    const labels = results[0].labelAnnotations;
    console.log('Labels:');
    labels.forEach((label) => console.log(label.description));
})
    .catch((err) => {
    console.error('ERROR:', err);
});
