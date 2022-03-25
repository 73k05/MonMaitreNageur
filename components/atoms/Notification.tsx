import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Palette, palettes, colors, fonts} from '../../assets/style';

export const Notification = ({
  color = 'secondary',
  icon,
  children,
}: {
  color: Palette;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  const styles = makeStyles({color});
  return (
    <View style={styles.root}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const makeStyles = ({color}: {color: Palette}) => {
  return StyleSheet.create({
    root: {
      backgroundColor: palettes[color].bg,
      borderRadius: 4,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
    },
    icon: {
      marginRight: 12,
    },
    text: {
      textAlign: 'left',
      color: colors.white,
      fontFamily: fonts.ssp,
      fontSize: 14,
      fontWeight: 'bold',
    },
  });
};

export default Notification;
