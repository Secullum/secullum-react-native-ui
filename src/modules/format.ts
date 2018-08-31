import { format as dfnsFormat } from 'date-fns';

const locales = {
  pt: require('date-fns/locale/pt'),
  en: require('date-fns/locale/en'),
  es: require('date-fns/locale/es')
};

export type Locale = 'pt' | 'en' | 'es';

let currentLocale: Locale = 'pt';

export const setLocale = (locale: Locale) => {
  currentLocale = locale;
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

export const formatDate = (date: Date, format: string) => {
  switch (currentLocale) {
    case 'pt':
      return fixPortugueseLowercase(
        dfnsFormat(date, format, { locale: locales.pt })
      );
    case 'es':
      return fixSpanishLowercase(
        dfnsFormat(date, format, { locale: locales.es })
      );
    default:
      return dfnsFormat(date, format, { locale: locales.en });
  }
};
