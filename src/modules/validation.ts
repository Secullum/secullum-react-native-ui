import { MaskService } from 'react-native-masked-text';

export const validateCPF = (value: any) => {
  return MaskService.isValid('cpf', value, {});
};

export const validateCNPJ = (value: any) => {
  return MaskService.isValid('cnpj', value, {});
};

export const isHour = (value: string) => {
  return /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/.test(value);
};
