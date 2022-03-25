import password from './password';

export default {
  password,
  confirmPassword: {
    equality: {
      attribute: 'password',
      message: 'Les mots de passe ne sont pas identiques.',
    },
  },
};
