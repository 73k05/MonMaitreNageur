import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const ArrowIcon = ({
  color = '#002e72',
  width = 8.374,
  height = 14.748,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 8.374 14.748">
      <path id="Tracé_392" data-name="Tracé 392" d="M458.7,119.462l-6.667-6.667,6.667-6.667" transform="translate(459.406 120.169) rotate(180)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="2"/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default ArrowIcon;
