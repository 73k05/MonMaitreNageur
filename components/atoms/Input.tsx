/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {colors, fonts} from '../../assets/style';
import {EyeIcon} from '../icons';
import {TextInputProps} from 'react-native-paper/lib/typescript/components/TextInput/TextInput';

// eslint-disable-next-line no-undef
interface InputInterface extends Partial<TextInputProps> {
  onChangeText?: any;
  placeholder: string;
  noUnderline?: boolean;
  error?: boolean;
  disabled?: boolean;
  text?: string;
}

export const Input = ({
  placeholder = '',
  onChangeText = () => {},
  error = false,
  disabled = false,
  text = '',
  noUnderline = false,
  secureTextEntry = false,
  ...props
}: InputInterface) => {
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [value, setValue] = useState<string>(text || '');
  const [hideText, setHideText] = useState<boolean>(secureTextEntry);
  const customTheme = {
    colors: {
      primary: !error ? colors.blueD : colors.pinkD,
      placeholder: !error ? colors.blueD : colors.pinkD,
      text: colors.blueD,
    },
    fonts: {
      regular: {
        fontFamily: fonts.ssp,
      },
    },
  };

  const toggleHideText = () => {
    const hidden = !hideText;
    if (hidden) {
      setPrevValue(value);
    }
    setHideText(hidden);
  };

  const onChange = (data: string) => {
    const val = prevValue ? prevValue : null;
    if (val && data) {
      setPrevValue(null);
    }
    const newValue = `${val ? val : ''}${data}`;
    setValue(newValue);
    onChangeText && onChangeText(newValue);
  };

  return (
    <View
      style={[
        styles.root,
        error && styles.rootError,
        noUnderline && {height: 64, overflow: 'hidden'},
      ]}>
      {secureTextEntry && (
        <View style={{position: 'absolute', right: 20, zIndex: 1000, top: 22}}>
          <TouchableOpacity onPress={toggleHideText}>
            <EyeIcon color={hideText ? colors.greyD : colors.pinkL} />
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
        keyboardType="default"
        label={placeholder}
        placeholderTextColor={colors.blueD}
        selectionColor={error ? colors.pinkD : colors.blueL30}
        disabled={disabled}
        underlineColor="transparent"
        mode="flat"
        theme={customTheme}
        secureTextEntry={hideText}
        clearTextOnFocus={false}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.greyD,
  },
  rootError: {
    borderColor: colors.pinkD,
  },
  input: {
    fontSize: 15,
    backgroundColor: colors.white,
    fontWeight: '400',
    paddingLeft: 10,
  },
  img: {
    width: 20,
    height: 20,
  },
});

export default Input;
