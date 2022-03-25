import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const FacebookIcon = ({
  color = '#FFFFFF',
  width = 20.768,
  height = 39.491,
}) => {
  const xml = `
    <svg id="Groupe_1321" data-name="Groupe 1321" xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 20.768 39.491">
      <path id="Tracé_2442" data-name="Tracé 2442" d="M127.623,77.83c1.056,0,2.119.057,3.172.1.688.028,1.375.126,2.02.2l-.048,6.359h-.505c-.7,0-1.4-.009-2.093-.009-.523,0-1.047,0-1.57.023-1.685.056-2.925.688-3.011,2.793-.054,1.516-.092,4.863-.095,5.039.088,0,1.753.006,3.429.006.838,0,1.657,0,2.228-.006h1.362c-.341,2.442-.654,4.786-.995,7.145h-6.022l-.136,17.84h-7.4l.136-17.868h-6.05l.054-7.1h6.078l0-.533c.011-1.432-.006-2.864.047-4.3a17.825,17.825,0,0,1,.231-2.723,8.082,8.082,0,0,1,3.241-5.306,9.3,9.3,0,0,1,5.332-1.656Q127.328,77.83,127.623,77.83Z" transform="translate(-112.046 -77.83)" fill=${color}/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default FacebookIcon;
