import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const DotsIcon = ({color = '#FFFFFF', width = 32, height = 8}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 32 8">
      <g id="Groupe_43" data-name="Groupe 43" transform="translate(-282 -743)">
        <circle id="Ellipse_1" data-name="Ellipse 1" cx="4" cy="4" r="4" transform="translate(282 743)" fill=${color}/>
        <circle id="Ellipse_2" data-name="Ellipse 2" cx="4" cy="4" r="4" transform="translate(294 743)" fill=${color}/>
        <circle id="Ellipse_3" data-name="Ellipse 3" cx="4" cy="4" r="4" transform="translate(306 743)" fill=${color}/>
      </g>
    </svg>

    `;

  return <SvgXml xml={xml} />;
};

export default DotsIcon;
