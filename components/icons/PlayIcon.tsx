import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const PlayIcon = ({color = '#FFF', width = 20.722, height = 27.681}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 20.722 27.681">
      <path id="Tracé_339" data-name="Tracé 339" d="M119.329,98.929V123.61l17.722-12.341Z" transform="translate(-117.829 -97.429)" fill="none" stroke=${color} stroke-linejoin="round" stroke-width="3"/>
    </svg>
`;

  return <SvgXml xml={xml} />;
};

export default PlayIcon;
