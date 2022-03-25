import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const HomeIcon = ({
  color = '#c8d9e5',
  width = 26.388,
  height = 22.367,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 26.388 22.367">
      <path id="Tracé_99" data-name="Tracé 99" d="M-897.315,402.108l-6.436-5.033V394.06h-1.921v1.513l-4.246-3.32a.96.96,0,0,0-1.183,0l-12.6,9.855,1.183,1.514,1.572-1.229v11.063a.96.96,0,0,0,.961.961h6.725a.961.961,0,0,0,.961-.961v-6.35h3.585v6.35a.96.96,0,0,0,.961.961h6.725a.96.96,0,0,0,.961-.961V402.392l1.572,1.23Zm-4.677,10.387h-4.8v-6.35a.961.961,0,0,0-.961-.961h-5.506a.961.961,0,0,0-.961.961v6.35h-4.8v-11.6l8.517-6.661,8.517,6.661Z" transform="translate(923.703 -392.049)" fill=${color}/>
    </svg>`;

  return <SvgXml xml={xml} />;
};

export default HomeIcon;
