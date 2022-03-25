import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Headline} from '../atoms/Headline';
import {Text} from '../atoms/Text';
import {SvgUri} from 'react-native-svg';
import {colors} from '../../assets/style';

export const StaticPage = ({content = []}) => {
  const width = Dimensions.get('screen').width;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {(content || []).map((c: any, i: number) => (
        <View key={i} style={styles.root}>
          {c.type === 'TITLE' && (
            <Headline style={styles.headlineStyle} mode={'h2'}>
              {c.content}
            </Headline>
          )}
          {c.type === 'TITLEH3' && (
            <Text
              style={styles.headlineh3Style}
              fontColor={'tertiary'}
              mode={'big'}
              weight={'bold'}>
              {c.content}
            </Text>
          )}
          {c.type === 'TEXT' && <Text fontColor="tertiary">{c.content}</Text>}
          {c.type === 'IMAGE' && (
            <Image
              style={[styles.image]}
              source={{width: width, uri: c.content}}
            />
          )}
          {c.type === 'SVG' && (
            <View style={{alignItems: 'center', marginBottom: 20}}>
              <SvgUri uri={c.content} />
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 20,
  },
  image: {
    borderRadius: 8,
    width: Dimensions.get('screen').width,
    maxWidth: '100%',
    height: Dimensions.get('screen').height / 4,
    backgroundColor: colors.greyD,
    marginBottom: 20,
  },
  headlineStyle: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  headlineh3Style: {
    paddingTop: 30,
    paddingBottom: 4,
  },
});

export default StaticPage;
