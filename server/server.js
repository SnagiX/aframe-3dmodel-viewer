'use strict';

const e = require('express');
const fs = require('fs'),
    https = require('https'),
    path = require('path'),
    chalk = require('chalk'),
    pug = require('pug'),
    express = require('express'),
    chokidar = require('chokidar'),
    openssl_self_signed_certificate = require('openssl-self-signed-certificate');

const tools = require("./tools");

const conf = JSON.parse(fs.readFileSync(process.cwd() + '/app-config.json'));

var models = [];

// CREATE SERVER

const app = express();
app.set('view engine', 'pug');

app.use("/dist", express.static('dist'));
app.use("/models", express.static('models'));
app.use("/cache", express.static('cache'));
app.use("/node_modules", express.static('node_modules'));

app.get('/rooms/:room', (req, res) => {
    let user = {
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    };
    res.render(process.cwd() + conf.folders.pages + 'rooms/' + req.params.room, {
        // export all variables here (to avoid conflicts in .pug files)
        add: {
            conf: conf.rooms[req.params.room],
            models: models
        }
    }, (err, out) => {
        if (err != null) {
            out = "This room doesn't exist or check pug's compile errors";
            if (conf.pug.debugErrors == true) console.log(chalk.redBright(`|ROUTER - ${user.ip}| `+err));
        }
        res.send(out);
    });
});
app.get('/', (req, res) => {
    res.redirect(`/rooms/${conf.defaultRoom}`);
});

app.listen(conf.port, () => {
    console.log(chalk.greenBright(`|SERVER| Server running at http://${conf.hostname}:${conf.port}/`));

    https.createServer({
        key: openssl_self_signed_certificate.key,
        cert: openssl_self_signed_certificate.cert
    }, app).listen(conf.port + 1);
    console.log(chalk.greenBright(`|SERVER| HTTPS enabled at https://${conf.hostname}:${conf.port + 1}/`));
});

// LISTEN /MODELS/ FOLDER

chokidar.watch('.'+conf.folders.models).on('all', (event, path) => {
    models = tools.updateModels(conf, {event, path}, models);
});