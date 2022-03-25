export default {
  presence: {
    allowEmpty: false,
    message: 'La civilité doit être renseignée.',
  },
  inclusion: {
    within: [1, 2, 3],
    message:
      'La civilité doit correspondre à un des 3 choix possibles : Autre (1), M. (2), Mme (3).',
  },
};
