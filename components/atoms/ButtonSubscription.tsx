import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Text, Headline} from '../../components';

import {palettes} from '../../assets/style';

export const ButtonSubscription = ({
  color = 'secondary',
  onPress,
  titleMonthly,
  price,
  month,
  priceMonth,
  payementType,
  style,
  otherPrice,
  ...props
}) => {
  const styles = makeStyles({color, ...props});

  return (
    <TouchableOpacity style={styles.containButton} onPress={onPress}>
      <Text mode="small" weight="bold">
        {titleMonthly}
      </Text>
      <View style={styles.alignView}>
        <Headline
          mode="h2"
          transform="uppercase"
          fontColor="white"
          style={styles.price}>
          {price}
        </Headline>
        <Headline mode="h4" transform="uppercase" fontColor="white">
          {month}
        </Headline>
      </View>
      <Text mode="body" weight="semibold" style={styles.crossed}>
        {otherPrice}
      </Text>
      <View>
        <Text mode="small" weight="regular">
          {priceMonth}
        </Text>
        <Text mode="small" weight="regular">
          {payementType}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = ({color, disabled}) => {
  const c = disabled ? 'disabled' : color;

  return StyleSheet.create({
    containButton: {
      backgroundColor: palettes[c].bg,
      paddingTop: 15,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 6,
      marginTop: 30,
      marginBottom: 10,
      maxWidth: '100%',
      maxHeight: '100%',
      height: 192,
      width: Dimensions.get('screen').width / 2 - 30,
      justifyContent: 'space-between',
    },
    price: {
      paddingTop: 5,
    },
    alignView: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    crossed: {
      textDecorationLine: 'line-through',
      paddingBottom: 15,
    },
  });
};

export default ButtonSubscription;
