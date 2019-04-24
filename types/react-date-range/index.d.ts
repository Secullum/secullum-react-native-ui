declare module 'react-date-range' {
  import * as React from 'react';
  import * as ReactNative from 'react-native';

  interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  export interface SelectedRanges {
    selection: Range;
  }

  interface DateRangeProps {
    showDateDisplay?: boolean;
    showMonthAndYearPickers?: boolean;
    onChange: (ranges: any) => void;
    ranges: Range[];
    locale?: object;
  }

  export class DateRange extends React.Component<DateRangeProps> {}
}

declare module 'react-date-range/dist/locale' {
  type Locale = {
    formatDistance: Function;
    formatRelative: Function;
    localize: {
      ordinalNumber: Function;
      era: Function;
      quarter: Function;
      month: Function;
      day: Function;
      dayPeriod: Function;
    };
    formatLong: Object;
    date: Function;
    time: Function;
    dateTime: Function;
    match: {
      ordinalNumber: Function;
      era: Function;
      quarter: Function;
      month: Function;
      day: Function;
      dayPeriod: Function;
    };
    options?: {
      weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
      firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
    };
  };

  export const pt: Locale;
  export const es: Locale;
  export const enUS: Locale;
}
