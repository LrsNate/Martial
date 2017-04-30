import WorkSelectorComponent from './work-selector.component';
import template from './work-editor.template.html';
import './work-editor.style.scss';

export default {
  selector: 'workEditor',
  template,
  bindings: {
    work: '=',
  },
  controller: class {

    constructor($uibModal, worksDao) {
      this.$uibModal = $uibModal;
      this.worksDao = worksDao;
      this.editedVice = '';
    }

    $onInit() {
      this.resolveOriginReference();
    }

    static get $inject() {
      return ['$uibModal', 'worksDao'];
    }

    changeOrigin() {
      const modalInstance = this.$uibModal.open({
        animation: true,
        component: WorkSelectorComponent.selector,
        windowClass: 'work-selector-modal',
      });

      modalInstance.result.then((workId) => {
        this.work.originId = workId;
        this.resolveOriginReference();
      });
    }

    removeOrigin() {
      this.work.originId = null;
      this.originReference = '';
    }

    addVice() {
      this.editedVice = this.editedVice.trim();
      if (!this.editedVice || !this.editedVice.length) return;
      this.work.vices.push(this.editedVice);
      this.editedVice = '';
    }

    deleteVice(index) {
      this.work.vices.splice(index, 1);
    }

    resolveOriginReference() {
      if (this.work.originId) {
        this.worksDao.getWork(this.work.originId).then((work) => {
          this.originWork = work;
          this.originReference = `${work.author}: ${work.reference}`;
        });
      } else {
        this.originReference = '';
      }
    }
  },
};
