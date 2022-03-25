import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const TimerIcon = ({
  color = '#FFFFFF',
  width = 20.35,
  height = 20.35,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 20.35 20.35">
      <g id="Groupe_368" data-name="Groupe 368" transform="translate(0 0)">
        <path id="Tracé_371" data-name="Tracé 371" d="M1050.385,69.522A10.175,10.175,0,1,0,1060.56,79.7,10.187,10.187,0,0,0,1050.385,69.522Zm.948,18.4V86.514h-1.9V87.92a8.293,8.293,0,0,1-7.275-7.275h1.406v-1.9h-1.406a8.293,8.293,0,0,1,7.275-7.274V72.88h1.9V71.475a8.292,8.292,0,0,1,7.274,7.274H1057.2v1.9h1.406A8.293,8.293,0,0,1,1051.333,87.92Z" transform="translate(-1040.21 -69.522)" fill=${color}/>
        <path id="Tracé_372" data-name="Tracé 372" d="M1115.084,118.178h-1.9V122.2a.948.948,0,0,0,.948.948h5.33v-1.9h-4.382Z" transform="translate(-1103.961 -112.026)" fill=${color}/>
      </g>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default TimerIcon;
