const fs = require('fs'),
    path = require('path'),
    chalk = require('chalk'),
    gltfPipeline = require('gltf-pipeline'),
    crypto = require('crypto'),
    fsExtra = require('fs-extra'),
    gltf_import_export = require("gltf-import-export");

module.exports = {

    // UPDATE EDITS IN MODELS FOLDER

    updateModels: (conf, input, models = []) => {
        switch (input.event) {
            case "add":
                let file = path.basename(input.path);

                models.push({
                    "title": path.parse(file).name,
                    "path": process.cwd() + "/" + input.path,
                    "size": fs.statSync(process.cwd() + "/" + input.path).size, 
                    "local": input.path,
                    "filename": file,
                    "ext": path.parse(file).ext.substring(1)
                });
                break;
            case "change":
                    
                break;
            case "unlink":
                for (const i in models) {
                    if (models.hasOwnProperty(i)) {
                        let el = models[i];
                        if (el.local == input.path) {
                            delete models[i];
                        }
                    }
                }
                break;
            default:
                return models;
        }
        console.log(chalk.cyanBright(`|MODELS| Model ${input.event} -> ${input.path}`));
        return models.filter(el => {
            return el != null;
        });
    }
}
