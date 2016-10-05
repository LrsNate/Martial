import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import mkdirp from 'mkdirp';
import osenv from 'osenv';

export default class FileHelperService {

    constructor ($q) {
        this._$q = $q;
        this._home = osenv.home();
        this._sep = process.platform === 'win32' ? '\\' : '/';
    }

    static get $inject() {
        return ['$q'];
    }

    getDataFolderPath() {
        return this._home + this._sep + 'Documents' + this._sep + 'Martial';
    }

    getFilePath(filename) {
        const folder = this.getDataFolderPath();
        return folder + this._sep + filename;
    }

    ensureFolderPathExists() {
        let path = this.getDataFolderPath();
        return this._$q((resolve) => {
            fs.stat(path, (err, stats) => {
                if (!err && stats.isDirectory()) {
                    resolve('Le dossier ' + path + ' existe déjà.');
                } else {
                    if (!err && !stats.isDirectory()) fs.unlink(path);
                    mkdirp.sync(this.getDataFolderPath());
                    resolve('Le dossier ' + path + ' a été créé.');
                }

            });
        });
    }

    fileExists(filename) {
        return this._$q((resolve) => {
            fs.stat(this.getFilePath(filename),(err) => {
                resolve(!err);
            });
        });
    }

    downloadWorksDatabase(progress) {
        return this.downloadFile('http://lrsnate.fr/assets/resources/works.db', progress);
    }

    downloadFile(fileUrl, progress) {
        return this._$q((resolve, reject) => {
            const filename = path.basename(fileUrl);
            const filePath = this.getFilePath(filename);
            const fileHandle = fs.createWriteStream(filePath);


            http.get(fileUrl, function (response) {
                const total = response.headers['content-length'];
                let achieved = 0;
                response.pipe(fileHandle);

                response.on('data', (chunk) => {
                    achieved += parseInt(chunk.length);
                    progress(achieved, total);
                });

                response.on('end', () => {
                    fileHandle.end();
                    resolve();
                });

            }).on('error', () => {
                fs.unlink(filePath, reject);
            });
        });
    }
}