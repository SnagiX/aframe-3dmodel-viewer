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

const log = console.log;

const conf = JSON.parse(fs.readFileSync(process.cwd() + '/app-config.json'));

var models = [];

// CREATE SERVER

const app = express();
app.set('view engine', 'pug');

app.use("/dist", express.static('dist'));
app.use("/models", express.static('models'));
app.use("/cache", express.static('cache'));
app.use("/node_modules", express.static('node_modules'));

app.get('/:room', (req, res) => {
    res.render(process.cwd() + conf.folders.pages + 'rooms/' + req.params.room, {
        aframe: conf.aframe,
        models: models
    });
});
app.get('/', (req, res) => {
    res.redirect(`/${conf.defaultRoom}`);
});

app.listen(conf.port, () => {
    log(chalk.greenBright(`|SERVER| Server running at http://${conf.hostname}:${conf.port}/`));

    https.createServer({
        key: openssl_self_signed_certificate.key,
        cert: openssl_self_signed_certificate.cert
    }, app).listen(conf.port + 1);
    log(chalk.greenBright(`|SERVER| HTTPS enabled at https://${conf.hostname}:${conf.port + 1}/`));
});

// LISTEN /MODELS/ FOLDER

chokidar.watch('.'+conf.folders.models).on('all', (event, path) => {
    models = tools.updateModels(conf, {event, path}, models);
});