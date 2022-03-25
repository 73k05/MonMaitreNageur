import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const ErrorIcon = ({color = '#c8d9e5', width = 90, height = 90}) => {
  const xml = `
    <svg id="Exercice_raté" data-name="Exercice raté" xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 90 91">
      <ellipse id="Ellipse_268" data-name="Ellipse 268" cx="45" cy="45.5" rx="45" ry="45.5" fill="#ff4d6b"/>
      <g id="Groupe_1958" data-name="Groupe 1958" transform="translate(14.821 45.878) rotate(-45)">
        <path id="Tracé_4612" data-name="Tracé 4612" d="M0,0V43.49" transform="translate(21.745)" fill="none" stroke="#002e72" stroke-width="8"/>
        <path id="Tracé_4613" data-name="Tracé 4613" d="M0,0V43.49" transform="translate(43.49 21.745) rotate(90)" fill="none" stroke="#002e72" stroke-width="8"/>
      </g>
    </svg>

`;

  return <SvgXml xml={xml} />;
};

export default ErrorIcon;
