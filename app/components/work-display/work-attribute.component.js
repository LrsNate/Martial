import _ from 'lodash';

export default {
  selector: 'workAttribute',
  templateUrl: 'components/work-display/work-attribute.template.html',
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
