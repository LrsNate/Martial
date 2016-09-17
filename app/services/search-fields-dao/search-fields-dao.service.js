'use strict';

angular
    .module('myApp.searchFieldsDao')
    .factory('searchFieldsDao', [() => {
        return {
            fields: [
                {
                    name: 'Auteur',
                    id: 'author',
                    type: 'string',
                    defaultMatcher: {name: 'est', id: 'is', type: 'string'}
                },
                {
                    name: 'Publication',
                    id: 'date_published',
                    type: 'date',
                    defaultMatcher: {name: 'depuis', id: 'after', type: 'date'}
                },
                {name: 'Mètre', id: 'meter', type: 'string', defaultMatcher: {name: 'est', id: 'is', type: 'string'}},
                {
                    name: 'Strophe',
                    id: 'stanza',
                    type: 'string',
                    defaultMatcher: {name: 'est', id: 'is', type: 'string'}
                },
                {
                    name: 'Oeuvre',
                    id: 'work',
                    type: 'work',
                    defaultMatcher: {name: 'imite', id: 'imitates', type: 'work'}
                }
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