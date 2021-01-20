export interface Theme {
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  backgroundColor1: string;
  backgroundColor2: string;
  backgroundColor3: string;
  backgroundColor4: string;
  borderColor1: string;
  shadowColor1: string;
  statusBarColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  disabledColor: string;
  counterBackgroundColor: string;
  counterBackgroundColor2: string;
  counterTextColor: string;
  fontFamily1: string;
  fontFamily2: string;
  fontFamily3: string;
}

let theme = {
  textColor1: '#282c37', // black
  textColor2: '#0c65c7', // blue
  textColor3: '#8c9aa8', // gray
  textColor4: '#ffffff', // white
  backgroundColor1: '#ffffff', // white
  backgroundColor2: '#eef1f6', // gray
  backgroundColor3: '#0c65c7', // blue
  backgroundColor4: '#0c65c7', // blue
  borderColor1: '#c2c2c2', // gray
  shadowColor1: '#aabec6', // gray
  statusBarColor: '#0047a9', // blue
  successColor: '#2ec562', // green
  warningColor: '#f5a623', // yellow
  errorColor: '#d62729', // red
  disabledColor: '#dddddd', // gray
  counterBackgroundColor: '#34bf6d', // light green
  counterBackgroundColor2: '#34bf6d', // grey
  counterTextColor: '#ffffff', // white
  fontFamily1: 'Lato-Bold',
  fontFamily2: 'Lato-Regular',
  fontFamily3: 'MankSans-Medium'
};

export const setTheme = (newTheme: { [K in keyof Theme]?: string }) => {
  theme = { ...theme, ...newTheme };
};

export const getTheme = (): Theme => {
  return theme;
};
