import { format as dfnsFormat } from 'date-fns';

const locales = {
  pt: require('date-fns/locale/pt')
};

const fixWeekdayLowercase = (formattedDate: string) => {
  formattedDate = formattedDate.replace('segunda-feira', 'Segunda-Feira');
  formattedDate = formattedDate.replace('terça-feira', 'Terça-Feira');
  formattedDate = formattedDate.replace('quarta-feira', 'Quarta-Feira');
  formattedDate = formattedDate.replace('quinta-feira', 'Quinta-Feira');
  formattedDate = formattedDate.replace('sexta-feira', 'Sexta-Feira');
  formattedDate = formattedDate.replace('sábado', 'Sábado');
  formattedDate = formattedDate.replace('domingo', 'Domingo');

  formattedDate = formattedDate.replace('seg', 'Seg');
  formattedDate = formattedDate.replace('ter', 'Ter');
  formattedDate = formattedDate.replace('qua', 'Qua');
  formattedDate = formattedDate.replace('qui', 'Qui');
  formattedDate = formattedDate.replace('sex', 'Sex');
  formattedDate = formattedDate.replace('sáb', 'Sáb');
  formattedDate = formattedDate.replace('dom', 'Dom');

  return formattedDate;
};

export const formatDate = (date: Date, format: string) => {
  return fixWeekdayLowercase(dfnsFormat(date, format, { locale: locales.pt }));
};
