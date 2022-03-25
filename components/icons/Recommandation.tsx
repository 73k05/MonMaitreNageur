import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const Recommandation = ({width = 65.077, height = 74.283}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 65.077 74.283">
      <g id="Groupe_1236" data-name="Groupe 1236" transform="translate(-85.532 -44.421) rotate(-8)">
        <g id="Groupe_1232" data-name="Groupe 1232" transform="translate(79.068 64.01)">
          <path id="Tracé_2438" data-name="Tracé 2438" d="M120.047,75.309h8.125a3.548,3.548,0,0,1,3.548,3.548v53.4a3.548,3.548,0,0,1-3.548,3.548H82.616a3.548,3.548,0,0,1-3.548-3.548v-53.4a3.548,3.548,0,0,1,3.548-3.548h8.128" transform="translate(-79.068 -71.115)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"/>
          <rect id="Rectangle_566" data-name="Rectangle 566" width="29.303" height="10.143" transform="translate(11.675)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"/>
        </g>
        <g id="Groupe_1233" data-name="Groupe 1233" transform="translate(88.531 82.968)">
          <line id="Ligne_7" data-name="Ligne 7" x2="15.707" transform="translate(17.884 5.612)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"/>
          <path id="Tracé_2439" data-name="Tracé 2439" d="M117.212,115.09l-7.459,7.459-5.188-5.188" transform="translate(-104.565 -115.09)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"/>
        </g>
        <g id="Groupe_1234" data-name="Groupe 1234" transform="translate(88.531 96.65)">
          <line id="Ligne_8" data-name="Ligne 8" x2="15.707" transform="translate(17.884 5.612)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"/>
          <path id="Tracé_2440" data-name="Tracé 2440" d="M117.212,151.952l-7.459,7.459-5.188-5.188" transform="translate(-104.565 -151.952)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"/>
        </g>
        <g id="Groupe_1235" data-name="Groupe 1235" transform="translate(88.531 110.332)">
          <line id="Ligne_9" data-name="Ligne 9" x2="15.707" transform="translate(17.884 5.612)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"/>
          <path id="Tracé_2441" data-name="Tracé 2441" d="M117.212,188.815l-7.459,7.459-5.188-5.188" transform="translate(-104.565 -188.815)" fill="none" stroke="#fff" stroke-linejoin="round" stroke-width="4"/>
        </g>
      </g>
    </svg>
`;

  return <SvgXml xml={xml} />;
};

export default Recommandation;
