import React from 'react';
import {AppStatusBar, ConnectedLayout, StaticPage} from '../components';
import useStaticPage from '../hooks/useStaticPage';
import Screen from '../hocs/Screen';

export const AboutScreen = Screen(({}) => {
  const {content} = useStaticPage('about_us');

  return (
    <ConnectedLayout back={true} title={'À propos'}>
      <AppStatusBar transparent />
      <StaticPage content={content} />
    </ConnectedLayout>
  );
});

export default AboutScreen;
