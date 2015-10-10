import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import fs from 'fs';
import routes from './routes';

var app = express()
    .use(bodyParser.json())
    .use(routes(app)) // returns a router
    .use('/', express.static('build/public'))
    ;

// listen on UNIX or HTTP socket
if (config.has('server.socket')) {
    let socket = config.get('server.socket');
    let m = socket.match(/^([^:]+):(\d+)$/)
    if (m) {
        app.listen(m[2], m[1], () => {
            console.log(`Listening on http://${socket}...`)
        });
    } else {
        fs.unlink(socket, () => {
            app.listen(socket, () => {
                console.log(`Listening on domain socket ${socket}...`)
            });
        })
    }
}

export default app;
