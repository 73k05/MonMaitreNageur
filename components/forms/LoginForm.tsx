import React from 'react';
import {
  EmailAndPasswordForm,
  EmailAndPasswordInterface,
} from '../../components';

export const LoginForm = (props: EmailAndPasswordInterface) => (
  <EmailAndPasswordForm {...props} />
);

export default LoginForm;
