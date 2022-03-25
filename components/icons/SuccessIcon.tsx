import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const SuccessIcon = ({
  colorStep1 = '#ffd31c',
  colorStep2 = '#C8D9E5',
  colorStep3 = '#C8D9E5',
  width = 45.18,
  height = 11.408,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 45.18 11.408">
      <g id="Groupe_1267" data-name="Groupe 1267" transform="translate(-98.187 -403)">
        <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M6.761.4,5.307,3.346,2.052,3.82a.713.713,0,0,0-.394,1.216L4.012,7.331l-.557,3.241a.712.712,0,0,0,1.034.751L7.4,9.793l2.912,1.53a.713.713,0,0,0,1.034-.751l-.557-3.241,2.355-2.295a.713.713,0,0,0-.394-1.216L9.495,3.346,8.04.4A.713.713,0,0,0,6.761.4Z" transform="translate(96.746 403.001)" fill=${colorStep1}/>
        <path id="Icon_awesome-star-2" data-name="Icon awesome-star" d="M6.761.4,5.307,3.346,2.052,3.82a.713.713,0,0,0-.394,1.216L4.012,7.331l-.557,3.241a.712.712,0,0,0,1.034.751L7.4,9.793l2.912,1.53a.713.713,0,0,0,1.034-.751l-.557-3.241,2.355-2.295a.713.713,0,0,0-.394-1.216L9.495,3.346,8.04.4A.713.713,0,0,0,6.761.4Z" transform="translate(113.377 403.001)" fill=${colorStep2}/>
        <path id="Icon_awesome-star-3" data-name="Icon awesome-star" d="M6.761.4,5.307,3.346,2.052,3.82a.713.713,0,0,0-.394,1.216L4.012,7.331l-.557,3.241a.712.712,0,0,0,1.034.751L7.4,9.793l2.912,1.53a.713.713,0,0,0,1.034-.751l-.557-3.241,2.355-2.295a.713.713,0,0,0-.394-1.216L9.495,3.346,8.04.4A.713.713,0,0,0,6.761.4Z" transform="translate(130.007 403.001)" fill=${colorStep3}/>
      </g>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default SuccessIcon;
