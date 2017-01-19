import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import mkdirp from 'mkdirp';
import osenv from 'osenv';

export default class FileHelperService {

  constructor($q) {
    this.$q = $q;
    this.home = osenv.home();
    this.sep = process.platform === 'win32' ? '\\' : '/';
  }

  static get $inject() {
    return ['$q'];
  }

  getDataFolderPath() {
    return `${this.home}${this.sep}Documents${this.sep}Martial`;
  }

  getFilePath(filename) {
    const dataFolderPath = this.getDataFolderPath();
    return dataFolderPath + this.sep + filename;
  }

  ensureFolderPathExists() {
    const dataFolderPath = this.getDataFolderPath();
    return this.$q((resolve) => {
      fs.stat(dataFolderPath, (err, stats) => {
        if (!err && stats.isDirectory()) {
          resolve(`Le dossier ${dataFolderPath} existe déjà.`);
        } else {
          if (!err && !stats.isDirectory()) fs.unlink(dataFolderPath);
          mkdirp.sync(this.getDataFolderPath());
          resolve(`Le dossier ${dataFolderPath} a été créé.`);
        }
      });
    });
  }

  fileExists(filename) {
    return this.$q((resolve) => {
      fs.stat(this.getFilePath(filename), (err) => {
        resolve(!err);
      });
    });
  }

  downloadWorksDatabase(progress) {
    return this.downloadFile('https://s3-eu-west-1.amazonaws.com/martial-db-versions/works.db', progress);
  }

  downloadFile(fileUrl, progress) {
    return this.$q((resolve, reject) => {
      const filename = path.basename(fileUrl);
      const filePath = this.getFilePath(filename);
      const fileHandle = fs.createWriteStream(filePath);


      https.get(fileUrl, (response) => {
        const total = response.headers['content-length'];
        let achieved = 0;
        response.pipe(fileHandle);

        response.on('data', (chunk) => {
          achieved += parseInt(chunk.length, 10);
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
