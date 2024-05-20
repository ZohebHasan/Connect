import * as tls from 'tls';
import * as fs from 'fs';
import * as path from 'path';

const options = {
    key: fs.readFileSync(path.join(__dirname, 'server-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'server-cert.pem')),
    ca: fs.readFileSync(path.join(__dirname, 'ca-cert.pem')),
    requestCert: true,
    rejectUnauthorized: true,
};

const server = tls.createServer(options, (socket) => {
    console.log('server connected', socket.authorized ? 'authorized' : 'unauthorized');
    socket.write('welcome!\n');
    socket.setEncoding('utf8');
    socket.pipe(socket);
});

server.listen(8000, () => {
    console.log('server bound');
});
