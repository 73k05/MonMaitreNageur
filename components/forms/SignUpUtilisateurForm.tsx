import React from 'react';
import {
  EmailAndPasswordForm,
  EmailAndPasswordInterface,
} from '../../components';

export const SignUpUtilisateurForm = (props: EmailAndPasswordInterface) => (
  <EmailAndPasswordForm {...props} />
);

export default SignUpUtilisateurForm;
