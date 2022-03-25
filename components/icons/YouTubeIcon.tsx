import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const YouTubeIcon = ({
  color = '#FFFFFF',
  width = 36.122,
  height = 25.306,
}) => {
  const xml = `
    <svg id="Groupe_1324" data-name="Groupe 1324" xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 36.122 25.306">
      <path id="Tracé_2449" data-name="Tracé 2449" d="M1089.881,107.036c1.293,3.411,1.241,15.833-.314,19.118a4.345,4.345,0,0,1-1.966,1.979c-1.218.628-8.285.926-15.209.926-6.373,0-12.624-.252-14.087-.729a4.185,4.185,0,0,1-2.759-2.7c-1.168-3.3-1.427-17.11.909-19.834a4.512,4.512,0,0,1,3.03-1.6c2.778-.3,8.136-.447,13.42-.447,6.58,0,13.046.228,14.273.672A4.257,4.257,0,0,1,1089.881,107.036Zm-21.631,14.823c3.749-1.951,7.483-3.874,11.26-5.825-3.747-1.965-7.452-3.9-11.171-5.853-.03,3.9-.059,7.762-.089,11.679" transform="translate(-1054.675 -103.754)" fill=${color}/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default YouTubeIcon;
