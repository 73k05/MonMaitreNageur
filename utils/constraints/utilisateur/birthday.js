export default {
  presence: {
    allowEmpty: false,
    message: 'La date de naissance ne peut pas être vide.',
  },
  format: {
    pattern:
      '((0?[1-9]|1[0-9]|2[0-9]|3[0-1])\\/(0?[1-9]|1[0-2])\\/((19|20)\\d\\d))$',
    message: 'La date de naissance doit être au format JJ/MM/AAAA.',
  },
};
