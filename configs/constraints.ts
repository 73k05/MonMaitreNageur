export const firstnameConstraints = {
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
};

export const birthdayConstraints = {
  presence: {
    allowEmpty: false,
    message: 'La date de naissance ne peut pas être vide.',
  },
  format: {
    pattern:
      '((0?[1-9]|1[0-9]|2[0-9]|3[0-1])\\/(0?[1-9]|1[0-2])\\/((19|20)\\d\\d))$',
    message: 'La date de naissance doit être au format JJ/MM/AAAA',
  },
};
