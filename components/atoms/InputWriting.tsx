/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import {colors, fonts} from '../../assets/style';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

// eslint-disable-next-line no-undef
interface InputWritingInterface extends Partial<TextInputProps> {
  onChangeText?: any;
  placeholder: string;
  noUnderline?: boolean;
  error?: boolean;
  text?: string;
  format?: 'default' | 'birthday';
}

export const InputWriting = ({
  placeholder,
  onChangeText = () => {},
  text,
  format,
  noUnderline = false,
  ...props
}: InputWritingInterface) => {
  const [value, setValue] = useState(text);

  useEffect(() => {
    setValue(text);
  }, [text]);

  const onChange = useCallback(
    data => {
      let newValue = data;

      switch (format) {
        case 'birthday':
          if (newValue.length === 2) {
            newValue = `${newValue}/`;
          }
          if (newValue.length === 5) {
            newValue = `${newValue}/`;
          }
          if (newValue.length > 10) {
            return;
          }
          break;
      }

      setValue(newValue);
      onChangeText && onChangeText(newValue);
    },
    [setValue, onChangeText, format],
  );

  return (
    <View
      style={[styles.root, noUnderline && {height: 64, overflow: 'hidden'}]}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        label={placeholder}
        placeholder={placeholder}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    shadowColor: '#002E72',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
  input: {
    height: 54,
    fontSize: 15,
    borderRadius: 50,
    backgroundColor: colors.white,
    fontWeight: '400',
    color: colors.blueD,
    fontFamily: fonts.ssp,
    paddingHorizontal: 14,
  },
});

export default InputWriting;
