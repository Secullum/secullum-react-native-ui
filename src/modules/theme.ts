export const BLACK = '#282c37';
export const WHITE = '#ffffff';
export const GRAY = '#8c9aa8';
export const GRAY_1 = '#eef1f6';
export const GRAY_2 = '#dddddd';
export const GRAY_3 = '#c2c2c2';
export const GRAY_4 = '#aabec6';
export const BLUE = '#0047a9';
export const BLUE_LIGHT = '#0c65c7';
export const YELLOW = '#f5a623';
export const GREEN = '#34bf6d';
export const GREEN_LIGHT = '#2ec562';
export const RED = '#d62729';

export interface Theme {
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  messageTextColor: string;
  counterTextColor: string;
  backgroundColor1: string;
  backgroundColor2: string;
  backgroundColor3: string;
  borderColor1: string;
  shadowColor1: string;
  statusBarColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  disabledColor: string;
  counterBackgroundColor: string;
  fontFamily1: string;
  fontFamily2: string;
  fontFamily3: string;
}

let theme = {
  textColor1: BLACK,
  textColor2: BLUE_LIGHT,
  textColor3: GRAY,
  textColor4: WHITE,
  messageTextColor: BLACK,
  counterTextColor: WHITE,
  backgroundColor1: WHITE,
  backgroundColor2: GRAY_1,
  backgroundColor3: BLUE_LIGHT,
  borderColor1: GRAY_3,
  shadowColor1: GRAY_4,
  statusBarColor: BLUE,
  successColor: GREEN_LIGHT,
  warningColor: YELLOW,
  errorColor: RED,
  disabledColor: GRAY_2,
  counterBackgroundColor: GREEN,
  fontFamily1: 'Roboto-Medium',
  fontFamily2: 'Roboto',
  fontFamily3: 'Roboto-Light'
};

export const setTheme = (newTheme: { [K in keyof Theme]?: string }) => {
  theme = { ...theme, ...newTheme };
};

export const getTheme = (): Theme => {
  return theme;
};
