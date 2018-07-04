import { format as dfnsFormat } from 'date-fns';

let locale: string = 'pt';

export const setLocale = (loc: string) => {
  locale = loc;
};

const getLocale = () => {
  switch (locale) {
    case 'pt':
      return require('date-fns/locale/pt');
    case 'es':
      return require('date-fns/locale/es');
    default:
      return require('date-fns/locale/en');
  }
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

const fixEspanishWeekdayLowercase = (formattedDate: string) => {
  formattedDate = formattedDate.replace('lunes', 'Lunes');
  formattedDate = formattedDate.replace('martes', 'Martes');
  formattedDate = formattedDate.replace('miércoles', 'Miércoles');
  formattedDate = formattedDate.replace('jueves', 'Jueves');
  formattedDate = formattedDate.replace('viernes', 'Viernes');
  formattedDate = formattedDate.replace('sábado', 'Sábado');
  formattedDate = formattedDate.replace('domingo', 'Domingo');

  formattedDate = formattedDate.replace('lun', 'Lun');
  formattedDate = formattedDate.replace('mar', 'Mar');
  formattedDate = formattedDate.replace('mié', 'Mié');
  formattedDate = formattedDate.replace('jue', 'Jue');
  formattedDate = formattedDate.replace('vie', 'Vie');
  formattedDate = formattedDate.replace('sáb', 'Sáb');
  formattedDate = formattedDate.replace('dom', 'Dom');

  return formattedDate;
};

export const formatDate = (date: Date, format: string) => {
  switch (locale) {
    case 'pt':
      return fixWeekdayLowercase(
        dfnsFormat(date, format, { locale: getLocale() })
      );
    case 'es':
      return fixEspanishWeekdayLowercase(
        dfnsFormat(date, format, { locale: getLocale() })
      );
    default:
      return dfnsFormat(date, format, { locale: getLocale() });
  }
};
