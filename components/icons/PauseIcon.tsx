import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const PauseIcon = ({color = '#FFF', width = 24, height = 24}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 24 24">
      <g id="Groupe_2137" data-name="Groupe 2137" transform="translate(-236 -233)">
        <g id="Groupe_2136" data-name="Groupe 2136" transform="translate(-1.5 2.934)">
          <line id="Ligne_28" data-name="Ligne 28" y2="5.841" transform="translate(246.5 239.066)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
          <line id="Ligne_29" data-name="Ligne 29" y2="5.841" transform="translate(252.5 239.066)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
        </g>
        <g id="Ellipse_295" data-name="Ellipse 295" transform="translate(236 233)" fill="none" stroke="#fff" stroke-width="3">
          <circle cx="12" cy="12" r="12" stroke="none"/>
          <circle cx="12" cy="12" r="10.5" fill="none"/>
        </g>
      </g>
    </svg>

`;

  return <SvgXml xml={xml} />;
};

export default PauseIcon;
