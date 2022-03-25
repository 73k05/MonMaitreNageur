import React from 'react';
import {BebeNageurIcon, NatationIcon, AquagymIcon} from '../';

export const Icon = ({name}: any) => {
  switch (name) {
    case 'Aquagym':
      return <AquagymIcon />;
    case 'BebeNageur':
      return <BebeNageurIcon />;
    case 'Natation':
      return <NatationIcon />;
    default:
      return null;
  }
};

export default Icon;
