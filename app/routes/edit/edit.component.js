import ConfirmDeleteWorkComponent from '../../components/confirm-delete-work/confirm-delete-work.component';

import template from './edit.template.html';

export default {
  selector: 'edit',
  template,
  controller: class {

    constructor($routeParams, $uibModal, $location, worksDao) {
      this.$uibModal = $uibModal;
      this.$location = $location;
      this.worksDao = worksDao;
      const workId = $routeParams.workId;
      this.editedVice = '';

      worksDao.getWork(workId).then((work) => {
        this.work = work;
      });
    }

    static get $inject() {
      return ['$routeParams', '$uibModal', '$location', 'worksDao'];
    }

    saveWork() {
      this.worksDao.updateWork(this.work).then(() => {
        this.$location.path('/search');
      });
    }

    confirmDeleteWork() {
      const modalInstance = this.$uibModal.open({
        animation: true,
        component: ConfirmDeleteWorkComponent.selector,
      });

      modalInstance.result.then(() => {
        this.deleteWork();
      });
    }

    deleteWork() {
      this.worksDao.deleteWork(this.work).then(() => {
        this.$location.path('/search');
      });
    }
  },
};
