import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {Headline, Text, TabBar, CardCoach} from '../../components';
import {
  palettes,
  colors,
  Palette,
  coachColorByIterator,
} from '../../assets/style';

export const ChipSession = ({
  color = 'secondary',
  imgURL,
  sessionName,
  activityName,
  coaches,
  backScreen,
  backParams,
  ...props
}: any) => {
  const styles = makeStyles({color, ...props});
  return (
    <ImageBackground
      source={{uri: imgURL}}
      style={[styles.image, styles.container]}>
      <View style={styles.filterBackground}>
        <TabBar
          back
          colorBack="white"
          backScreen={backScreen}
          backParams={backParams}
        />
        <View style={styles.paddingView}>
          <View style={styles.alignView}>
            <View style={styles.titleheight}>
              <Text
                mode="small"
                transform="uppercase"
                fontColor="primary"
                weight="semibold"
                style={styles.textHeight}>
                {activityName}
              </Text>
              <Headline fontColor="white" mode="h1" divider>
                {sessionName}
              </Headline>
            </View>
            <View style={{flexDirection: 'row'}}>
              {coaches.map(({id, image}: any, i: number) => (
                <CardCoach
                  key={id}
                  mode="verysmall"
                  color={coachColorByIterator(i)}
                  image={image}
                  style={{marginLeft: 10}}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const makeStyles = ({color, disabled}: any) => {
  const c: Palette = disabled ? 'disabled' : color;
  return StyleSheet.create({
    root: {},
    container: {
      backgroundColor: palettes[c].bg,
    },
    image: {
      height: 235,
    },
    titleheight: {
      paddingTop: 45,
    },
    paddingView: {
      // paddingTop: 84,
      paddingLeft: 20,
      paddingRight: 20,
    },
    textHeight: {
      paddingTop: 10,
    },
    filterBackground: {
      backgroundColor: colors.blueD80,
      height: '100%',
    },
    alignView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
  });
};
export default ChipSession;
