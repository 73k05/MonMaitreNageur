import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const LinkedInIcon = ({
  color = '#FFFFFF',
  width = 31.894,
  height = 31.947,
}) => {
  const xml = `
    <svg id="Groupe_1323" data-name="Groupe 1323" xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 31.894 31.947">
      <g id="Groupe_1277" data-name="Groupe 1277" transform="translate(0 0)">
        <path id="Tracé_2446" data-name="Tracé 2446" d="M742.049,91.616a3.808,3.808,0,0,1,3.817,3.846,3.879,3.879,0,0,1-3.875,3.846,3.817,3.817,0,0,1-3.817-3.846A3.888,3.888,0,0,1,742.049,91.616Z" transform="translate(-738.174 -91.616)" fill=${color}/>
      </g>
      <g id="Groupe_1278" data-name="Groupe 1278" transform="translate(0.319 10.598)">
        <path id="Tracé_2447" data-name="Tracé 2447" d="M746.143,130.351l-.163,21.35h-6.639l.163-21.35Z" transform="translate(-739.341 -130.351)" fill=${color}/>
      </g>
      <g id="Groupe_1279" data-name="Groupe 1279" transform="translate(11.113 10.078)">
        <path id="Tracé_2448" data-name="Tracé 2448" d="M791.691,128.452c6.724,0,7.925,4.408,7.882,10.162l-.089,11.707h-6.625l.079-10.373c.019-2.484-.013-5.671-3.41-5.671-3.453,0-3.993,2.7-4.014,5.488l-.081,10.556h-6.639l.163-21.35h6.359l-.022,2.92h.1A7.036,7.036,0,0,1,791.691,128.452Z" transform="translate(-778.793 -128.452)" fill=${color}/>
      </g>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default LinkedInIcon;
