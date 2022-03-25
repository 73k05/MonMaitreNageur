import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const MediumIntensityIcon = ({
  color = '#FFFFFF',
  width = 28.938,
  height = 22.976,
}) => {
  const xml = `
    <svg id="Groupe_370" data-name="Groupe 370" xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 28.938 26.618">
      <g id="Groupe_294" data-name="Groupe 294" transform="translate(0 2.444)">
        <path id="Tracé_384" data-name="Tracé 384" d="M35.56,89.577h1.9a12.607,12.607,0,0,1,5.459-9.465l-.951-1.646A14.508,14.508,0,0,0,35.56,89.577Z" transform="translate(-35.56 -78.466)" fill=${color}/>
      </g>
      <g id="Groupe_295" data-name="Groupe 295" transform="translate(4.738 6.022)">
        <path id="Tracé_385" data-name="Tracé 385" d="M115.432,156.3h.008l4.769.064a.58.58,0,0,1,.495.87l-.58,1,3.257,1.381a.58.58,0,0,1-.226,1.114h-.008l-4.769-.064a.58.58,0,0,1-.494-.87l.58-1-3.257-1.381a.58.58,0,0,1,.226-1.114Z" transform="translate(-109.565 -150.036)" fill=${color}/>
        <path id="Tracé_386" data-name="Tracé 386" d="M73.16,109.7a.949.949,0,0,0-.013.926L74.54,113.2a8.47,8.47,0,1,0,2.34-4.053l-2.925.081A.948.948,0,0,0,73.16,109.7Zm3.3,3.655a6.576,6.576,0,1,1,3.012,7.581A6.575,6.575,0,0,1,76.463,113.359Z" transform="translate(67.837 -120.273) rotate(60)" fill=${color}/>
      </g>
      <path id="Tracé_387" data-name="Tracé 387" d="M99.25,60.633l.95,1.646a12.4,12.4,0,0,1,5.429-1.25,12.715,12.715,0,0,1,5.5,1.252l.951-1.645a14.474,14.474,0,0,0-12.828,0Z" transform="translate(-91.197 -59.138)" fill=${color}/>
      <path id="Tracé_388" data-name="Tracé 388" d="M212.978,86.358a14.452,14.452,0,0,0-5.837-7.892l-.951,1.646a12.348,12.348,0,0,1,2.07,1.764,12.662,12.662,0,0,1,2.9,5.027,12.44,12.44,0,0,1,.493,2.674h1.9A14.232,14.232,0,0,0,212.978,86.358Z" transform="translate(-184.616 -76.022)" fill=${color} opacity="0.3"/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default MediumIntensityIcon;
