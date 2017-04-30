import _ from 'lodash';

import template from './search.template.html';
import './search.style.scss';

export default {
  selector: 'search',
  template,
  controller: class {

    constructor($location, $scope, worksDao, searchHelper) {
      this.fullWorks = [];
      this.works = [];
      this.filters = [];
      this.phraseFilter = '';
      this.statusMessage = 'Chargement des épigrammes...';
      this.selectedWork = null;
      this.hasReferences = {};
      this.$location = $location;
      this.searchHelper = searchHelper;

      worksDao.getWorks().then((works) => {
        this.fullWorks = works;
        this.works = works;
        this.displayedWorks = works.slice(0, 30);
        this.statusMessage = 'Aucune épigramme n\'a pu être trouvée avec ces critères';

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

    edit(work) {
      this.$location.path(`/edit/${work._id}`);
    }

    filterByReference(work) {
      this.filters = [
        {
          field: { name: 'Oeuvre', id: 'work', type: 'work' },
          matcher: { name: 'imite', id: 'imitates', type: 'work' },
          term: {
            name: `${work.author}: ${work.reference}`,
            id: work._id,
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
      const start = this.displayedWorks.length - 1;
      const lastIndex = Math.min(start + 10, this.works.length - 1);
      for (let i = start + 1; i <= lastIndex; i += 1) {
        this.displayedWorks.push(this.works[i]);
      }
    }
  },
};
