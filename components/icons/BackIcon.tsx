import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const BackIcon = ({
  color = '#0070d2',
  width = 8.801,
  height = 15.102,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 8.801 15.102">
      <path id="Tracé_307" data-name="Tracé 307" d="M458.7,119.462l-6.667-6.667,6.667-6.667" transform="translate(-450.782 -105.244)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="2.5"/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default BackIcon;
