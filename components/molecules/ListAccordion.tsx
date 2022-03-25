import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {ListItem, Text} from '../';
import {colors} from '../../assets/style';

export const ListAccordion = ({
  style = {},
  question,
  answer,
}: {
  style?: Object;
  question: string;
  answer: string;
}) => {
  const [open, setDropdownOpen] = useState(false);

  return (
    <View style={[styles.container, style, open ? styles.containerOpen : null]}>
      <ListItem
        title={question}
        open={open}
        onPress={() => setDropdownOpen(!open)}
      />
      {open ? (
        <View>
          <Divider style={styles.divider} />
          <Text mode="little" fontColor="tertiary">
            {answer}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {},
  container: {
    width: '100%',
    justifyContent: 'center',
    minHeight: 60,
    backgroundColor: colors.white,
    borderRadius: 4,
    shadowColor: '#002E72',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    marginBottom: 10,
  },
  containerOpen: {
    height: 'auto',
    paddingBottom: 20,
  },
  divider: {
    backgroundColor: colors.greyD,
    marginBottom: 14,
    marginTop: 14,
  },
  alignView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ListAccordion;
