import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const AccountIcon = ({
  color = '#c8d9e5',
  width = 21.265,
  height = 22.37,
}) => {
  const xml = `
    <svg id="Groupe_51" data-name="Groupe 51" xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 21.265 22.37">
      <path id="Tracé_74" data-name="Tracé 74" d="M1050.778,416.255a5.772,5.772,0,1,0-5.718-.429,5.848,5.848,0,0,0,.746.429,10.22,10.22,0,0,0-8.147,9.995v1.4h1.921v-1.4a8.291,8.291,0,0,1,8.282-8.282h.859A8.291,8.291,0,0,1,1057,426.25v1.4h1.921v-1.4A10.22,10.22,0,0,0,1050.778,416.255Zm-6.265-4.478a3.849,3.849,0,0,1,3.049-4.509,3.894,3.894,0,0,1,.738-.071,3.85,3.85,0,1,1-3.787,4.58Z" transform="translate(-1037.659 -405.275)" fill=${color}/>
      <rect id="Rectangle_316" data-name="Rectangle 316" width="5.751" height="1.921" transform="translate(10.633 20.444)" fill=${color}/>
    </svg>
`;

  return <SvgXml xml={xml} />;
};

export default AccountIcon;
