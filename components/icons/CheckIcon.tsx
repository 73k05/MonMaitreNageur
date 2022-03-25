import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const CheckIcon = ({color = '#FFF', size = 14.686}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="9.832" height="6.753" viewBox="0 0 9.832 6.753">
      <path id="Tracé_4549" data-name="Tracé 4549" d="M-979.8,340.72a.642.642,0,0,1-.456-.189l-3.268-3.268.911-.911,2.812,2.812,5.2-5.2.911.911-5.653,5.653A.643.643,0,0,1-979.8,340.72Z" transform="translate(983.525 -333.967)" fill=${color}/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default CheckIcon;
