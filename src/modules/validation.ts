import { MaskService } from 'react-native-masked-text';

export const validateCPF = (value: any) => {
  return MaskService.isValid('cpf', value, {});
};

export const validateCNPJ = (value: any) => {
  return MaskService.isValid('cnpj', value, {});
};
