import * as _ from 'lodash';

export default {
  selector: 'search',
  templateUrl: 'routes/search/search.template.html',
  controller: class {

    constructor($location, $scope, worksDao, searchHelper) {
      this.fullWorks = [];
      this.works = [];
      this.filters = [];
      this.phraseFilter = '';
      this.selectedWork = null;
      this.hasReferences = {};
      this.$location = $location;
      this.searchHelper = searchHelper;

      worksDao.getWorks().then((works) => {
        this.fullWorks = works;
        this.works = works;
        this.displayedWorks = works.slice(0, 30);

        _.each(works, (work) => {
          if (work.originId) this.hasReferences[work.originId] = true;
        });
      });

      $scope.$watch(() => this.phraseFilter, () => this.refreshFilters());
    }

    static get $inject() {
      return ['$location', '$scope', 'worksDao', 'searchHelper'];
    }

    setSelectedWork(work) {
      this.selectedWork = work;
    }

    edit($event, work) {
      $event.stopPropagation();
      this.$location.path(`/edit/${work._id}`); // eslint-disable-line no-underscore-dangle
    }

    filterByReference($event, work) {
      $event.stopPropagation();
      this.filters = [
        {
          field: { name: 'Oeuvre', id: 'work', type: 'work' },
          matcher: { name: 'imite', id: 'imitates', type: 'work' },
          term: {
            name: `${work.author}: ${work.reference}`,
            id: work._id, // eslint-disable-line no-underscore-dangle
          },
        },
      ];
      this.phraseFilter = '';
      this.refreshFilters();
    }

    refreshFilters() {
      this.searchHelper.applyFilters(this.filters, this.phraseFilter, this.fullWorks)
        .then((works) => {
          this.works = works;
          this.displayedWorks = works.slice(0, 30);
        });
    }

    onInfiniteScroll() {
      if (!this.displayedWorks) return;
      const last = this.displayedWorks.length - 1;
      for (let i = 1; i <= 10; i += 1) {
        this.displayedWorks.push(this.works[last + i]);
      }
    }
  },
};
