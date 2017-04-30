import _ from 'lodash';

import template from './work-attribute.template.html';

export default {
  selector: 'workAttribute',
  template,
  bindings: {
    name: '@',
    value: '<',
  },
  controller: class {
    constructor() {
      if (_.isArray(this.value)) {
        this.value = this.value.join(', ');
      }
    }
  },
};
