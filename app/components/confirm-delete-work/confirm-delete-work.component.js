import template from './confirm-delete-work.template.html';

export default {
  selector: 'confirmDeleteWork',
  template,
  bindings: {
    close: '&',
    dismiss: '&',
  },
  controller: class {

    confirm() {
      this.close();
    }

    cancel() {
      this.dismiss();
    }
  },
};
