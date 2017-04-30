import _ from 'lodash';

import template from './text-display.template.html';

export default {
  selector: 'textDisplay',
  template,
  bindings: {
    work: '<',
    referenceWork: '<',
    targetVersion: '@',
  },
  controller: class TextDisplayController {
    constructor($scope) {
      $scope.$watch(() => this.work, () => this.init());
      $scope.$watch(() => this.referenceWork, () => this.init());
    }

    static get $inject() {
      return ['$scope'];
    }

    init() {
      this.findAvailableVersions();
      if (this.hasVersion(this.targetVersion)) {
        this.setVersion(this.findVersion(this.targetVersion));
      } else {
        this.setVersion(this.availableVersions[0]);
      }
    }

    findAvailableVersions() {
      this.availableVersions = [];
      if (this.referenceWork && this.referenceWork.latinText) {
        this.availableVersions.push({ name: TextDisplayController.getReference(this.referenceWork, 'latin'), id: 'reference-latin' });
      }
      if (this.referenceWork && this.referenceWork.frenchText) {
        this.availableVersions.push({ name: TextDisplayController.getReference(this.referenceWork, 'french'), id: 'reference-french' });
      }
      if (this.work.latinText) {
        this.availableVersions.push({ name: TextDisplayController.getReference(this.work, 'latin'), id: 'latin' });
      }
      if (this.work.frenchText) {
        this.availableVersions.push({ name: TextDisplayController.getReference(this.work, 'french'), id: 'french' });
      }
    }

    hasVersion(version) {
      return _.some(this.availableVersions, v => v.id === version);
    }

    findVersion(version) {
      return _.find(this.availableVersions, v => v.id === version);
    }

    setVersion(targetVersion) {
      this.activeVersion = targetVersion;
      if (targetVersion.id === 'reference-latin') {
        this.text = this.referenceWork.latinText;
      } else if (targetVersion.id === 'reference-french') {
        this.text = this.referenceWork.frenchText;
      } else if (targetVersion.id === 'latin') {
        this.text = this.work.latinText;
      } else {
        this.text = this.work.frenchText;
      }
    }

    static getReference(work, language) {
      let result = work.author;
      if (work.reference || work.title) {
        result += `, ${work.reference || work.title}`;
      }
      return `${result} : ${language === 'latin' ? 'latin' : 'français'}`;
    }
  },
};
