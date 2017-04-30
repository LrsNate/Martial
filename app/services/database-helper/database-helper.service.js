import * as fs from 'fs';
import * as https from 'https';

export default class DatabaseHelperService {
  constructor($q, fileHelper) {
    this.$q = $q;
    this.fileHelper = fileHelper;
    this.s3UrlPrefix = 'https://s3-eu-west-1.amazonaws.com/martial-db-versions/';
  }

  static get $inject() {
    return ['$q', 'fileHelper'];
  }

  getLatestVersion() {
    const versionsUrl = 'https://qlbxt69zv1.execute-api.eu-west-1.amazonaws.com/prod/GetLatestVersion';
    return this.$q((resolve, reject) => {
      https.get(versionsUrl, (response) => {
        let rawData = '';
        response.on('data', (chunk) => {
          rawData += chunk;
        });

        response.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(e.message);
          }
        });
      });
    });
  }

  downloadVersion(versionId, progress) {
    return this.$q((resolve, reject) => {
      const filename = 'works.db';
      const filePath = this.fileHelper.getFilePath(filename);
      const fileHandle = fs.createWriteStream(filePath);


      https.get(this.s3UrlPrefix + versionId, (response) => {
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
