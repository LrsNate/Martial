import template from './work-selector.template.html';
import './work-selector.style.scss';

export default {
  selector: 'workSelector',
  template,
  bindings: {
    close: '&',
    dismiss: '&',
  },
  controller: class {

    cancel() {
      this.dismiss();
    }

    select(work) {
      this.close({ $value: work._id });
    }
  },
};
