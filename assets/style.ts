import {StyleSheet} from 'react-native';

export type Palette =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disabled'
  | 'white'
  | 'secondaryDark'
  | 'fourth';

export const colors: any = {
  blueD: '#002e72',
  blueD80: 'rgba(0, 46, 114, 0.8)',
  blueL: '#0070d2',
  blueL80: 'rgba(0, 112, 210, 0.8)',
  blueL30: 'rgba(0, 112, 210, 0.3)',
  pinkD: '#ff4d6b',
  pinkD80: 'rgba(255, 77, 107, 0.8)',
  pinkL: '#ffb3b7',
  pinkL80: 'rgba(255, 179, 183, 0.8)',
  greyL: '#F5F8FA',
  greyD: '#C8D9E5',
  white: '#FFFFFF',
  black: '#000000',
  black80: 'rgba(0, 0, 0, 0.4)',
  greyB: '#ABCFEE',
  disabled: '#DDE7EE',
  notification: '#00D9B8',
};

export const activitiesColors: string[] = [
  colors.pinkD80,
  colors.blueL80,
  colors.blueD80,
];
export const coachsColors: string[] = [
  colors.pinkD,
  colors.blueL,
  colors.blueD,
];

export const coachColorByIterator = (iterator: number) =>
  coachsColors[iterator % coachsColors.length];

export const activityColorByIterator = (iterator: number) =>
  activitiesColors[iterator % activitiesColors.length];

export const palettes = {
  primary: {
    bg: colors.pinkD,
    text: colors.white,
    border: colors.pinkD,
  },
  secondary: {
    bg: colors.blueL,
    text: colors.white,
    border: colors.blueL,
  },
  secondaryDark: {
    bg: colors.blueD,
    text: colors.white,
    border: colors.blueD,
  },
  secondaryLight: {
    bg: colors.blueL30,
    text: colors.white,
    border: colors.blueL30,
  },
  disabled: {
    bg: colors.greyL,
    text: colors.disabled,
    border: colors.disabled,
  },
  tertiary: {
    bg: colors.greyD,
    text: colors.blueD,
    border: colors.greyD,
  },
  white: {
    bg: colors.white,
    text: colors.blueD,
    border: colors.white,
  },
  fourth: {
    bg: colors.greyB,
    text: colors.white,
    border: colors.greyB,
  },
  instagram: {
    bg: ['#6737B5', '#D00F61', '#F75F00'],
  },
  facebook: {
    bg: ['#00A0F3', '#00A0F3'],
  },
  youtube: {
    bg: ['#FF1727', '#FF1727'],
  },
  linkedin: {
    bg: ['#006CBF', '#006CBF'],
  },
  notification: {
    bg: colors.notification,
    text: colors.white,
  },
};

export const paletteFonts: any = {
  primary: {
    text: colors.pinkD,
  },
  secondary: {
    text: colors.blueL,
  },
  tertiary: {
    text: colors.blueD,
  },
  fourth: {
    text: '#C8D9E5',
  },
  disabled: {
    text: colors.disabled,
  },
  white: {
    text: colors.white,
  },
};

export const fonts = {
  cm: 'Core Mellow',
  ssp: 'Source Sans Pro',
};

export const typo = StyleSheet.create({
  h1: {
    fontSize: 65,
    fontFamily: fonts.cm,
    fontWeight: 'bold',
  },
  h2: {
    fontFamily: fonts.cm,
    fontWeight: 'bold',
    fontSize: 28,
  },
  h3: {
    textAlign: 'left',
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: fonts.ssp,
    marginBottom: 10,
  },
  h3Small: {
    textAlign: 'left',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fonts.ssp,
    marginBottom: 10,
  },
  h4: {
    fontFamily: fonts.cm,
    fontWeight: 'bold',
    fontSize: 16,
  },
  littleP: {
    fontFamily: fonts.ssp,
    fontWeight: 'normal',
    fontSize: 12,
  },
  tabBar: {
    fontFamily: fonts.cm,
    fontWeight: 'bold',
    fontSize: 10,
  },
  p: {
    fontFamily: fonts.ssp,
    fontSize: 15,
    fontWeight: '300',
  },
  btnLink: {
    fontFamily: fonts.cm,
    fontWeight: 'bold',
    fontSize: 14,
  },
  link: {
    fontFamily: fonts.ssp,
    fontWeight: 'normal',
    fontSize: 12,
  },
});

export const notify = StyleSheet.create({
  default: {
    backgroundColor: colors.blueL,
  },
  error: {
    backgroundColor: colors.pinkD,
  },
});

export default {typo, colors, fonts};
