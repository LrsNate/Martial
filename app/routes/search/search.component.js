import template from './search.template.html';

export default {
  selector: 'search',
  template,
  controller: class {

    constructor($location) {
      this.selectedWork = null;
      this.$location = $location;
    }

    static get $inject() {
      return ['$location'];
    }

    edit(work) {
      this.$location.path(`/edit/${work._id}`);
    }
  },
};
