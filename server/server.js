'use strict';

const e = require('express');
const fs = require('fs'),
    https = require('https'),
    path = require('path'),
    chalk = require('chalk'),
    pug = require('pug'),
    express = require('express'),
    openssl_self_signed_certificate = require('openssl-self-signed-certificate');

const tools = require("./tools");

const log = console.log;

const conf = JSON.parse(fs.readFileSync(process.cwd() + '/app-config.json'));

var models = [];
conf.ext.forEach(extension => {
    Array.prototype.push.apply(models, tools.findInDir(__dirname + "/.."+conf.folders.models, extension));
});

// PREPARING MODEL CACHE

// console.log(models);

// CREATE SERVER

const app = express();
app.set('view engine', 'pug');

app.use("/dist", express.static('dist'));
app.use("/models", express.static('models'));
app.use("/cache", express.static('cache'));

app.get('/', (req, res) => {
    res.render(process.cwd() + conf.folders.pages + 'index', {
        aframe: conf.aframe,
        models: models
    });
});

app.listen(conf.port, () => {
    log(chalk.greenBright(`Server running at http://${conf.hostname}:${conf.port}/`));

    https.createServer({
        key: openssl_self_signed_certificate.key,
        cert: openssl_self_signed_certificate.cert
    }, app).listen(conf.port + 1);
    log(chalk.greenBright(`  -> HTTPS enabled at https://${conf.hostname}:${conf.port + 1}/`));
});

