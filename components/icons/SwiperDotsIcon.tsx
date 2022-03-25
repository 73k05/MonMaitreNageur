import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const SwiperDotsIcon = ({
  color = '#ff4d6b',
  width = 18.274,
  height = 10.588,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 18.274 10.588">
      <path id="Tracé_38" data-name="Tracé 38" d="M143.225-249.449v2.917a10.619,10.619,0,0,1-9.144-5.25,10.577,10.577,0,0,1-9.13,5.25v-2.917a7.681,7.681,0,0,0,7.671-7.671h2.917A7.693,7.693,0,0,0,143.225-249.449Z" transform="translate(-124.951 257.12)" fill=${color}/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default SwiperDotsIcon;
