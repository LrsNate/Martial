export default {
  templateUrl: 'components/search-box/search-box.template.html',
  bindings: {
    filters: '=',
    phraseFilter: '=',
    onUpdate: '&',
  },
  controller: class {

    constructor($timeout) {
      this.$timeout = $timeout;
    }

    static get $inject() {
      return ['$timeout'];
    }

    deleteFilter(index) {
      this.filters.splice(index, 1);
      this.onUpdate();
    }

    addFilter() {
      this.filters.push({});
    }

    reset() {
      this.filters = [];
      this.phraseFilter = '';
      this.$timeout(() => {
        this.onUpdate();
      });
    }
  },
};
