import * as _ from 'lodash';

export default {
  selector: 'search',
  templateUrl: 'routes/search/search.template.html',
  controller: class {

    constructor($location, worksDao, searchHelper) {
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
        this.statusMessage = 'Aucune épigramme n\'a pu être trouvée avec ces critères';

        _.each(works, (work) => {
          if (work.originId) this.hasReferences[work.originId] = true;
        });
      });
    }

    static get $inject() {
      return ['$location', 'worksDao', 'searchHelper'];
    }

    setSelectedWork(work) {
      this.selectedWork = work;
    }

    edit(work) {
      this.$location.path(`/edit/${work._id}`); // eslint-disable-line no-underscore-dangle
    }

    filterByReference(work) {
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
      this.searchHelper.applyFilters(this.filters, this.fullWorks)
        .then((works) => {
          this.works = works;
        });
    }
  },
};
