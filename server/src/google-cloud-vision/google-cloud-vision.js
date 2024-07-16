// this is a type script file that uses the google cloud vision api to detect text in an image

const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient(
    {
        keyFilename: '<KEY_FILE>'
    }
);

client
.labelDetection('<IMAGE_PATH>')
.then(results => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach(label=> console.log(label.description));
}
)
.catch(err => {
    console.error('ERROR:', err);
}
);

