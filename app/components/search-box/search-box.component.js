export default {
    templateUrl: 'components/search-box/search-box.template.html',
    bindings: {
        filters: '=',
        phraseFilter: '=',
        onUpdate: '&'
    },
    controller: class {

        constructor($timeout) {
            this._$timeout = $timeout;
            this.statusMessage = 'Préparation de l\'index de recherche...';
        }

        //noinspection JSUnusedGlobalSymbols
        deleteFilter(index) {
            this.filters.splice(index, 1);
            this.onUpdate();
        }

        addFilter() {
            this.filters.push({});
        }

        //noinspection JSUnusedGlobalSymbols
        reset() {
            this.filters = [];
            this.phraseFilter = '';
            this._$timeout(() => {
                this.onUpdate();
            });
        }
    }
};