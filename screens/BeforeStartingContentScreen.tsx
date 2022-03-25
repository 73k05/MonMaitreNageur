import React, {useCallback, useEffect, useState} from 'react';
import {AppStatusBar, ConnectedLayout, Player, StaticPage} from '../components';
import {AccessoriesScreen} from './AccessoriesScreen';
import Screen from '../hocs/Screen';
import {BEFORE_STARTING_PAGE} from '../configs/queries';
import {useMmnQuery, useRouting} from '../hooks';
import {useRoute} from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';

export const BeforeStartingContentScreen = Screen(() => {
  const {goHome, goActivity} = useRouting();
  const route = useRoute();
  const {id}: any = route.params;
  const {loading, data} = useMmnQuery(BEFORE_STARTING_PAGE(id));
  const [beforeStartingPage, setBeforeStartingPage] = useState(null);

  useEffect(() => {
    setBeforeStartingPage(data?.beforeStartingPage?.beforeStartingPage);
  }, [data]);

  const handleBack = useCallback(() => {
    beforeStartingPage?.activity?.id
      ? goActivity(beforeStartingPage?.activity?.id, {backScreen: 'Home'})
      : goHome;
  }, [beforeStartingPage, goActivity, goHome]);

  if (loading || !beforeStartingPage) {
    return <LoadingScreen />;
  }

  return (
    <>
      {beforeStartingPage?.isEquipmentsList && (
        <AccessoriesScreen
          activity={beforeStartingPage?.activity}
          title={beforeStartingPage?.name}
          accessories={beforeStartingPage?.beforeStartingPageContents}
        />
      )}
      {beforeStartingPage?.isVideo && !beforeStartingPage?.isEquipmentsList && (
        <Player
          video={beforeStartingPage?.beforeStartingPageContents[0]?.content}
          end={handleBack}
          back={handleBack}
        />
      )}
      {!beforeStartingPage?.isVideo && !beforeStartingPage?.isEquipmentsList && (
        <ConnectedLayout back={true} title={beforeStartingPage?.name}>
          <AppStatusBar transparent />
          <StaticPage
            content={beforeStartingPage?.beforeStartingPageContents}
          />
        </ConnectedLayout>
      )}
    </>
  );
});

export default BeforeStartingContentScreen;
