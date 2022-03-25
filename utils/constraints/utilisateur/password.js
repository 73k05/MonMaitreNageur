export default {
  presence: {
    allowEmpty: false,
    message: 'Choisissez un mot de passe',
  },
  length: {
    minimum: 6,
    tooShort: 'Le mot de passe doit comporter au moins 6 caractères',
  },
  format: {
    pattern: '(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z]).*',
    message:
      'Le mot de passe doit comporter au moins une majuscule, un minuscule, un nombre et comporter au moins 6 caractères',
    flags: 'ug',
  },
};
