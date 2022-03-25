import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const SendIcon = ({color = '#0070d2', size = 26.812}) => {
  const xml = `
        <svg xmlns="http://www.w3.org/2000/svg" width=${size} height=${size} viewBox="0 0 26.812 26.812">
            <g id="Icon_feather-send" data-name="Icon feather-send" transform="translate(-2 -1.586)">
                <path id="Tracé_83" data-name="Tracé 83" d="M29.919,3,16.5,16.419" transform="translate(-2.521 0)" fill="none" stroke=${color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                <path id="Tracé_84" data-name="Tracé 84" d="M27.4,3,18.858,27.4,13.979,16.419,3,11.539Z" transform="translate(0 0)" fill="none" stroke=${color} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
            </g>
        </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default SendIcon;
