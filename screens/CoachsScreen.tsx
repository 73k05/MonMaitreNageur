import React, {useEffect} from 'react';
import Device from 'react-native-device-detection';
import {StyleSheet, FlatList, TouchableOpacity, Platform} from 'react-native';
import {
  CardCoachInterface,
  ConnectedLayout,
  CardCoach,
  AppStatusBar,
} from '../components';
import Screen from '../hocs/Screen';
import {gql} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import {coachColorByIterator} from '../assets/style';
import useMmnQuery from '../hooks/useMmnQuery';

const COACHS = gql`
  {
    coaches {
      success
      errorCode
      coaches {
        id
        firstname
        image
        label
      }
    }
  }
`;

export const CoachsScreen = Screen(() => {
  const navigation = useNavigation();
  //const [coaches, setCoaches] = useState<CardCoachInterface[]>([]);
  const {loading, error, data, refetch} = useMmnQuery(COACHS);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const coaches = data?.coaches?.coaches || [];

  return (
    <ConnectedLayout tabs={true} title={'Nos coachs'}>
      <AppStatusBar transparent />
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={loading}
        onRefresh={refetch}
        style={styles.flatListStyle}
        data={coaches}
        renderItem={({
          item,
          index,
        }: {
          item: CardCoachInterface;
          index: number;
        }) => {
          const color = coachColorByIterator(index);
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Coach', {
                  id: item.id,
                  color,
                  backScreen: 'Coachs',
                });
              }}
              style={[
                {marginBottom: 10},
                Platform.OS === 'ios' ? {marginTop: 0} : {marginTop: 20},
              ]}>
              <CardCoach
                id={item.id}
                color={color}
                mode="default"
                image={item.image}
                firstname={item.firstname}
                label={item.label}
              />
            </TouchableOpacity>
          );
        }}
        numColumns={Device.isTablet ? 2 : 1}
      />
    </ConnectedLayout>
  );
});

const styles = StyleSheet.create({
  flatListStyle: {
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default CoachsScreen;
