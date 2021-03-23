'use strict';

const fs = require('fs'),
    http = require('http'),
    path = require('path'),
    chalk = require('chalk'),
    pug = require('pug'),
    tools = require('./tools'),
    express = require('express');

const log = console.log;

const conf = JSON.parse(fs.readFileSync(process.cwd() + '/app-config.json'));
const models = fs.readdirSync(process.cwd() + conf.folders.models, "utf8").map(item => {
    const path = `${process.cwd() + conf.folders.models}${item}`;

    log(chalk.blueBright(`|FOUND MODEL| ${item}`))
    return {
        name: item,
        path: path,
        isDir: fs.lstatSync(path).isDirectory()
    };
}).sort((a, b) => b.isDir - a.isDir || a.name > b.name ? 1 : -1);


// CREATE SERVER

const app = express();
app.set('view engine', 'pug');

app.use("/dist", express.static('dist'));
app.use("/models", express.static('models'));

app.get('/', (req, res) => {
    res.render(process.cwd() + conf.folders.pages + 'index', 
    {
        scene_render: conf.scene.VR.render
    });
});

app.listen(conf.port, () => {
    log(chalk.greenBright(`Server running at http://${conf.hostname}:${conf.port}/`));
});