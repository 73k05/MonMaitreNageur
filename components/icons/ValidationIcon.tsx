import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const ValidationIcon = ({
  color = '#c8d9e5',
  width = 90,
  height = 90,
}) => {
  const xml = `
    <svg id="Exercice_réussi" data-name="Exercice réussi" xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 90 91">
      <ellipse id="Ellipse_267" data-name="Ellipse 267" cx="45" cy="45.5" rx="45" ry="45.5" fill="#00d9b8"/>
      <path id="Tracé_4610" data-name="Tracé 4610" d="M136.99,123.438l-24.655,24.655L98.082,133.841" transform="translate(-72.384 -90.399)" fill="none" stroke="#002e72" stroke-linejoin="round" stroke-width="8"/>
    </svg>

`;

  return <SvgXml xml={xml} />;
};

export default ValidationIcon;
