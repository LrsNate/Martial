'use strict';

class FileHelper {

    constructor ($q) {
        this.$q = $q;
        this.fs = require('fs');
        this.http = require('http');
        this.path = require('path');

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

    fileExists(filename) {
        return this.$q((resolve) => {
            this.fs.stat(this.getFilePath(filename),(err) => {
                resolve(!err);
            });
        });
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