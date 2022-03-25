import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const DownloadIcon = ({
  color = '#fff',
  width = 22.779,
  height = 18.428,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 22.779 18.428">
      <g id="Groupe_1239" data-name="Groupe 1239" transform="translate(-78.252 -90.662)">
        <path id="Tracé_424" data-name="Tracé 424" d="M100.031,174.778v3.5a1.579,1.579,0,0,1-1.579,1.579H80.831a1.579,1.579,0,0,1-1.579-1.579v-3.5" transform="translate(0 -71.763)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="2"/>
        <g id="Groupe_378" data-name="Groupe 378" transform="translate(84.05 90.662)">
          <path id="Tracé_425" data-name="Tracé 425" d="M123.107,135.71l-5.592,5.592-5.592-5.592" transform="translate(-111.923 -129.094)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="2"/>
          <line id="Ligne_3" data-name="Ligne 3" y2="12.207" transform="translate(5.592 0)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="2"/>
        </g>
      </g>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default DownloadIcon;
