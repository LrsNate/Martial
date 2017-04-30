import template from './list-input.template.html';
import './list-input.style.scss';

export default {
  selector: 'listInput',
  template,
  bindings: {
    elements: '=',
    placeholder: '@',
    label: '@',
  },
  controller: class {

    addElement() {
      if (!this.editedElement || !this.editedElement.trim().length) return;
      this.editedElement = this.editedElement.trim();
      if (!this.elements) {
        this.elements = [];
      }
      this.elements.push(this.editedElement);
      this.editedElement = '';
    }

    deleteElement(index) {
      this.elements.splice(index, 1);
    }
  },
};
