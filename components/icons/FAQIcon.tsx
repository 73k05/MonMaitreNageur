import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const FAQIcon = ({
  color = '#002e72',
  width = 30.342,
  height = 30.342,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 30.342 30.342">
      <g id="Icon_ionic-ios-help-circle-outline" data-name="Icon ionic-ios-help-circle-outline" transform="translate(-3.375 -3.375)">
        <path id="Tracé_31" data-name="Tracé 31" d="M18.546,5.417A13.123,13.123,0,1,1,9.261,9.261a13.042,13.042,0,0,1,9.285-3.844m0-2.042A15.171,15.171,0,1,0,33.717,18.546,15.169,15.169,0,0,0,18.546,3.375Z" transform="translate(0 0)" fill=${color}/>
        <path id="Tracé_32" data-name="Tracé 32" d="M18.219,11.25c2.735,0,4.617,1.517,4.617,3.7a3.567,3.567,0,0,1-2.05,3.238c-1.269.737-1.7,1.276-1.7,2.21v.576H16.556l-.022-.627a3.036,3.036,0,0,1,1.721-3.209c1.233-.737,1.75-1.2,1.75-2.108a1.77,1.77,0,0,0-1.962-1.568,1.845,1.845,0,0,0-1.955,1.794H13.5C13.551,12.906,15.287,11.25,18.219,11.25ZM16.3,23.751a1.566,1.566,0,1,1,1.561,1.5A1.528,1.528,0,0,1,16.3,23.751Z" transform="translate(0.378 0.294)" fill=${color}/>
      </g>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default FAQIcon;
