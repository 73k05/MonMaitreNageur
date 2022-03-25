import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const EyeIcon = ({
  color = '#ffffff',
  width = 26.775,
  height = 20.155,
}) => {
  const xml = `    
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 26.775 20.155">
      <g id="ŒIL_Mot_de_passe" data-name="ŒIL Mot de passe" transform="translate(1.25 1.25)">
        <path id="Tracé_42" data-name="Tracé 42" d="M82.128,109.465s4.414-8.827,12.137-8.827,12.137,8.827,12.137,8.827-4.414,8.827-12.137,8.827S82.128,109.465,82.128,109.465Z" transform="translate(-82.128 -100.638)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="2.5"/>
        <path id="Tracé_43" data-name="Tracé 43" d="M138.11,134.8a3.31,3.31,0,1,1-3.31-3.31h0A3.31,3.31,0,0,1,138.11,134.8Z" transform="translate(-122.663 -125.973)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="2.5"/>
      </g>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default EyeIcon;
