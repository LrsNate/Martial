const stringIsMatcher = { name: 'est', id: 'is', type: 'string' };

export default {
  fields: [
    {
      name: 'Auteur',
      id: 'author',
      type: 'string',
      defaultMatcher: stringIsMatcher,
    },
    {
      name: 'Publication',
      id: 'date_published',
      type: 'date',
      defaultMatcher: { name: 'depuis', id: 'after', type: 'date' },
    },
    {
      name: 'Mètre',
      id: 'meter',
      type: 'string',
      defaultMatcher: stringIsMatcher,
    },
    {
      name: 'Strophe',
      id: 'stanza',
      type: 'string',
      defaultMatcher: stringIsMatcher,
    },
    {
      name: 'Oeuvre',
      id: 'work',
      type: 'work',
      defaultMatcher: { name: 'imite', id: 'imitates', type: 'work' },
    },
    {
      name: 'Destinataire',
      id: 'addressee',
      type: 'string',
      defaultMatcher: stringIsMatcher,
    },
  ],
  matchers: [
    stringIsMatcher,
    { name: 'n\'est pas', id: 'is_not', type: 'string' },
    { name: 'depuis', id: 'after', type: 'date' },
    { name: 'jusqu\'à', id: 'before', type: 'date' },
    { name: 'imite', id: 'imitates', type: 'work' },
  ],
};
