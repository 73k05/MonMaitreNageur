import React, {useState} from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Button, InputWriting} from '../atoms';

export const Writing = ({
  onClick,
  format = 'default',
  type = 'default',
}: any) => {
  const [value, setValue] = useState('');

  const onChange = (v: string) => {
    setValue(v);
  };

  const handleClick = () => {
    onClick && onClick(value);
    setValue('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.directionView}>
        <View style={styles.widthInputWriting}>
          <InputWriting
            text={value}
            placeholder="Saisir votre réponse…"
            onChangeText={onChange}
            keyboardType={type}
            format={format}
          />
        </View>
        <View style={styles.widthButton}>
          <Button
            mode="icon"
            color="white"
            icon="send"
            onPress={() => handleClick()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  widthInputWriting: {
    width: '80%',
  },
  widthButton: {
    marginLeft: 5,
  },
  directionView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Writing;
