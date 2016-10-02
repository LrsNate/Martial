'use strict';

class FileHelper {

    constructor ($q) {
        this.$q = $q;
        this.fs = require('fs');
        this.http = require('http');
        this.path = require('path');
        this.mkdirp = require('mkdirp');

        const osenv = require('osenv');
        this.home = osenv.home();
        this.sep = process.platform === 'win32' ? '\\' : '/';
    }

    static get $inject() {
        return ['$q'];
    }

    getDataFolderPath() {
        return this.home + this.sep + 'Documents' + this.sep + 'Martial';
    }

    getFilePath(filename) {
        const folder = this.getDataFolderPath();
        return folder + this.sep + filename;
    }

    ensureFolderPathExists() {
        let path = this.getDataFolderPath();
        return this.$q((resolve) => {
            this.fs.stat(path, (err, stats) => {
                if (!err && stats.isDirectory()) {
                    resolve('Le dossier ' + path + ' existe déjà.');
                } else {
                    if (!err && !stats.isDirectory()) this.fs.unlink(path);
                    this.mkdirp.sync(this.getDataFolderPath());
                    resolve('Le dossier ' + path + ' a été créé.');
                }

            });
        });
    }

    fileExists(filename) {
        return this.$q((resolve) => {
            this.fs.stat(this.getFilePath(filename),(err) => {
                resolve(!err);
            });
        });
    }

    downloadWorksDatabase(progress) {
        return this.downloadFile('http://lrsnate.fr/assets/resources/works.db', progress);
    }

    downloadFile(fileUrl, progress) {
        return this.$q((resolve, reject) => {
            const filename = this.path.basename(fileUrl);
            const filePath = this.getFilePath(filename);
            const fileHandle = this.fs.createWriteStream(filePath);


            this.http.get(fileUrl, function (response) {
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
                this.fs.unlink(filePath, reject);
            });
        });
    }
}

angular.module('myApp.fileHelper')
    .factory('fileHelper', ($q) => new FileHelper($q));