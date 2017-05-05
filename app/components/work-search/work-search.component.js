import _ from 'lodash';

import template from './work-search.template.html';
import './work-search.style.scss';

export default {
  selector: 'workSearch',
  template,
  bindings: {
    action: '@',
    onAction: '&',
    onSelect: '&',
  },
  controller: class {
    constructor($scope, worksDao, searchHelper) {
      this.filters = [];
      this.statusMessage = 'Chargement des épigrammes...';
      this.phraseFilter = '';
      this.hasReferences = {};
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
      return ['$scope', 'worksDao', 'searchHelper'];
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
