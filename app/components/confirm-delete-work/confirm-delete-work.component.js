export default {
  selector: 'confirmDeleteWork',
  templateUrl: 'components/confirm-delete-work/confirm-delete-work.template.html',
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
