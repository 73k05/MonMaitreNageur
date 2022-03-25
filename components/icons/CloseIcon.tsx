import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const CloseIcon = ({color = '#FFF', size = 14.686}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 14.686 14.686">
      <g id="Groupe_376" data-name="Groupe 376" transform="translate(-86.603 -34.658)">
        <path id="Tracé_413" data-name="Tracé 413" d="M0,0V18.269" transform="translate(87.488 35.542) rotate(-45)" fill="none" stroke=${color} stroke-width="2.5"/>
        <path id="Tracé_414" data-name="Tracé 414" d="M0,0V18.269" transform="translate(100.406 35.542) rotate(45)" fill="none" stroke=${color} stroke-width="2.5"/>
      </g>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default CloseIcon;
