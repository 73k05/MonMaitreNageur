import password from '../../utilisateur/password';

export default {
  currentPassword: password,
  password: password,
  confirmPassword: {
    equality: {
      attribute: 'password',
      message: 'Le mot de passe et sa confirmation sont différents.',
    },
  },
};
