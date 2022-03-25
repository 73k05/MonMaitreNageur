import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export const NatationIcon = ({
  color = '#FFFFFF',
  width = 45.518,
  height = 31.498,
}) => {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width=${width} height=${height} viewBox="0 0 45.518 31.498">
      <path id="Tracé_110" data-name="Tracé 110" d="M92.025,109.149a5.071,5.071,0,0,0-7.443,0,2.482,2.482,0,0,1-3.953,0,7.15,7.15,0,0,0-1.845-1.251c-.028-.159-.06-.331-.1-.51a10.448,10.448,0,0,0-.589-1.8,6.567,6.567,0,0,0,3.055,1.225,6.715,6.715,0,0,0,.866.056,6.609,6.609,0,1,0-6.543-5.623c-.2-.249-.389-.474-.562-.663a.958.958,0,0,1-.252-.669l.123-5.84a1.74,1.74,0,0,1,.771-1.408L80.2,89.548a4.483,4.483,0,0,0-4.9-7.508l-4.164,2.872a12.006,12.006,0,0,0-5.57,10.167v4.638a75.64,75.64,0,0,0-11.031,7.818c-.121-.009-.245-.014-.373-.014a5.358,5.358,0,0,0-3.724,1.627,2.811,2.811,0,0,1-1.965.977v2.7a5.357,5.357,0,0,0,3.722-1.626,2.467,2.467,0,0,1,3.935,0,5.073,5.073,0,0,0,7.445,0,2.468,2.468,0,0,1,3.935,0,5.077,5.077,0,0,0,7.449,0,2.451,2.451,0,0,1,3.914,0,5.094,5.094,0,0,0,7.472,0,2.461,2.461,0,0,1,3.925,0,5.356,5.356,0,0,0,3.722,1.626v-2.7A2.808,2.808,0,0,1,92.025,109.149Zm-13.89-9.392a3.9,3.9,0,1,1,.777,2.882A3.906,3.906,0,0,1,78.135,99.757Zm-4.934,9.39a2.468,2.468,0,0,1-3.936,0,5.077,5.077,0,0,0-7.45,0,2.464,2.464,0,0,1-3.93,0c-.17-.146-.35-.3-.541-.45a76.335,76.335,0,0,1,9.827-6.792l.087-.056a2.378,2.378,0,0,0,1.01-1.944V95.079a9.316,9.316,0,0,1,4.339-7.9l4.161-2.869A1.779,1.779,0,0,1,78.694,87.3l-4.646,3.114a4.446,4.446,0,0,0-1.969,3.6l-.123,5.839a3.651,3.651,0,0,0,.959,2.551,15.639,15.639,0,0,1,3.04,5.211A5.892,5.892,0,0,0,73.2,109.146Z" transform="translate(-48.471 -81.332)" fill=${color}/>
    </svg>
    `;

  return <SvgXml xml={xml} />;
};

export default NatationIcon;
