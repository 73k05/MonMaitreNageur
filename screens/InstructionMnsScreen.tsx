import React from 'react';
import {AppStatusBar, ConnectedLayout, StaticPage} from '../components';
import useStaticPage from '../hooks/useStaticPage';
import Screen from '../hocs/Screen';

export const InstructionMnsScreen = Screen(({}) => {
  const {content} = useStaticPage('instruction_mns');

  return (
    <ConnectedLayout back={true} title={'Les consignes du MNS'}>
      <AppStatusBar transparent />
      <StaticPage content={content} />
    </ConnectedLayout>
  );
});

export default InstructionMnsScreen;
