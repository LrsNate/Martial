'use strict';

angular
    .module('myApp.searchFieldsDao')
    .factory('searchFieldsDao', [function () {
        return {
            fields: [
                {name: 'Auteur', id: 'author', type: 'string'},
                {name: 'Publication', id: 'date_published', type: 'date'},
                {name: 'Mètre', id: 'meter', type: 'string'},
                {name: 'Strophe', id: 'stanza', type: 'string'},
                {name: 'Oeuvre', id: 'work', type: 'work'}
            ],
            matchers: [
                {name: 'est', id: 'is', type: 'string'},
                {name: 'n\'est pas', id: 'is_not', type: 'string'},
                {name: 'depuis', id: 'after', type: 'date'},
                {name: 'jusqu\'à', id: 'before', type: 'date'},
                {name: 'imite', id: 'imitates', type: 'work'}
            ]
        };
    }]);