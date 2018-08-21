export interface Theme {
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  backgroundColor1: string;
  backgroundColor2: string;
  backgroundColor3: string;
  borderColor1: string;
  statusBarColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  disabledColor: string;
}

let theme = {
  textColor1: '#282c37', // black
  textColor2: '#0c65c7', // blue
  textColor3: '#8c9aa8', // gray
  textColor4: '#ffffff', // white
  backgroundColor1: '#ffffff', // white
  backgroundColor2: '#eef1f6', // gray
  backgroundColor3: '#0c65c7', // blue
  borderColor1: '#c2c2c2', // gray
  statusBarColor: '#0047a9', // blue
  successColor: '#2ec562', // green
  warningColor: '#f5a623', // yellow
  errorColor: '#d62729', // red
  disabledColor: '#dddddd' // gray
};

export const setTheme = (newTheme: { [K in keyof Theme]?: string }) => {
  theme = { ...theme, ...newTheme };
};

export const getTheme = (): Theme => {
  return theme;
};
