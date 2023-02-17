import { format as dfnsFormat, parse as dfnsParse } from 'date-fns';

const dfnslocales = {
  pt: require('date-fns/locale/pt-BR'),
  en: require('date-fns/locale/en-US'),
  es: require('date-fns/locale/es')
};

export type Locale = 'pt' | 'en' | 'es';

let currentLocale: Locale = 'pt';

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
};

export const getLocale = () => {
  return currentLocale;
};

export const parseDate = (date: string, format: string) => {
  return dfnsParse(date, format, new Date());
};

export const getDateFnsLocale = () => {
  let fnsLocate = dfnslocales.en;
  switch (currentLocale) {
    case 'pt':
      fnsLocate = dfnslocales.pt;
      break;
    case 'es':
      fnsLocate = dfnslocales.es;
      break;
  }

  if (fnsLocate.default) {
    return fnsLocate.default;
  }

  return fnsLocate;
};

const fixPortugueseLowercase = (formattedDate: string) => {
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

  formattedDate = formattedDate.replace('janeiro', 'Janeiro');
  formattedDate = formattedDate.replace('fevereiro', 'Fevereiro');
  formattedDate = formattedDate.replace('março', 'Março');
  formattedDate = formattedDate.replace('abril', 'Abril');
  formattedDate = formattedDate.replace('maio', 'Maio');
  formattedDate = formattedDate.replace('junho', 'Junho');
  formattedDate = formattedDate.replace('julho', 'Julho');
  formattedDate = formattedDate.replace('agosto', 'Agosto');
  formattedDate = formattedDate.replace('setembro', 'Setembro');
  formattedDate = formattedDate.replace('outubro', 'Outubro');
  formattedDate = formattedDate.replace('novembro', 'Novembro');
  formattedDate = formattedDate.replace('dezembro', 'Dezembro');

  return formattedDate;
};

const fixSpanishLowercase = (formattedDate: string) => {
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

  formattedDate = formattedDate.replace('enero', 'Enero');
  formattedDate = formattedDate.replace('febrero', 'Febrero');
  formattedDate = formattedDate.replace('marzo', 'Marzo');
  formattedDate = formattedDate.replace('abril', 'Abril');
  formattedDate = formattedDate.replace('mayo', 'Mayo');
  formattedDate = formattedDate.replace('junio', 'Junio');
  formattedDate = formattedDate.replace('julio', 'Julio');
  formattedDate = formattedDate.replace('agosto', 'Agosto');
  formattedDate = formattedDate.replace('septiembre', 'Septiembre');
  formattedDate = formattedDate.replace('octubre', 'Octubre');
  formattedDate = formattedDate.replace('noviembre', 'Noviembre');
  formattedDate = formattedDate.replace('diciembre', 'Diciembre');

  return formattedDate;
};

export const formatDate = (date: Date | string, format: string) => {
  if (typeof date === 'string') {
    // case 135870 - Acontecia casos onde a data/horas estavam sendo alteradas pois o react-native assume o fuso sempre como '00:00',
    // para que isso não aconteça, se a data for do tipo string o fuso horario será adicionado na data para que não tenha alteração.
    // A regex busca datas no formato "yyyy-MM-DDTHH:mm:ss", podendo ter ou não milisegundos, mas sem fuso horário informado.
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?$/.test(date)) {
      const timezoneOffset = new Date().getTimezoneOffset();
      const hours = Math.floor(Math.abs(timezoneOffset) / 60);
      const minutes = Math.abs(timezoneOffset) % 60;
      const sign = timezoneOffset > 0 ? '-' : '+';
      const timezone =
        sign +
        hours.toString().padStart(2, '0') +
        ':' +
        minutes.toString().padStart(2, '0');
      date = date + timezone;
    }
  }

  const formattedDate = dfnsFormat(
    typeof date === 'string' ? new Date(date) : date,
    format,
    {
      locale: getDateFnsLocale()
    }
  );

  switch (currentLocale) {
    case 'pt':
      return fixPortugueseLowercase(formattedDate);
    case 'es':
      return fixSpanishLowercase(formattedDate);
    default:
      return formattedDate;
  }
};
