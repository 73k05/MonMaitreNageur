import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const ArrowUpIcon = ({
  color = '#002e72',
  width = 14.748,
  height = 8.374,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 14.748 8.374">
      <path id="Tracé_1617" data-name="Tracé 1617" d="M6.667,0,0,6.667l6.667,6.667" transform="translate(14.041 1) rotate(90)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="2"/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default ArrowUpIcon;
