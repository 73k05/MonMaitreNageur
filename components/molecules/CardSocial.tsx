import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, TextMode} from '../';
import {Palette, palettes} from '../../assets/style';

export const CardSocial = ({
  color,
  mode = 'small',
  socialName,
  socialLink,
  icon,
  ...props
}: {
  color: Palette;
  mode: TextMode;
  socialName: string;
  socialLink: string;
  icon: React.ReactNode;
}) => {
  const styles = makeStyles({});
  return (
    <TouchableOpacity {...props}>
      <LinearGradient
        colors={palettes[color].bg}
        style={[styles.container]}
        start={{x: 1, y: 0.0}}>
        {icon}
        <View style={styles.viewStyle}>
          <Text weight="regular" style={styles.textStyle}>
            {socialName}
          </Text>
          <Text mode={mode} weight="bold" style={styles.textStyle}>
            {socialLink}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const makeStyles = ({}) => {
  return StyleSheet.create({
    root: {},
    container: {
      // alignItems: 'center',
      paddingTop: 38,
      paddingBottom: 38,
      paddingLeft: 14,
      paddingRight: 14,
      borderRadius: 6,
      maxWidth: '100%',
      maxHeight: '100%',
      height: 172,
    },
    textStyle: {
      marginTop: 0,
      marginBottom: 0,
    },
    viewStyle: {
      paddingTop: 18,
    },
  });
};

export default CardSocial;
