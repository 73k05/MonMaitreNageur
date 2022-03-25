module.exports = {
  firstname: {
    presence: {
      allowEmpty: false,
      message: 'Le prénom ne peut pas être vide.',
    },
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: 'Le prénom doit faire au moins 2 caractères.',
      tooLong: 'Le prénom doit faire maximum 100 caractères.',
    },
  },
  lastname: {
    presence: {
      allowEmpty: false,
      message: 'Le nom ne peut pas être vide.',
    },
    length: {
      minimum: 2,
      maximum: 100,
      tooShort: 'Le nom de famille doit faire au moins 2 caractères.',
      tooLong: 'Le nom de famille doit faire maximum 100 caractères.',
    },
  },
};
