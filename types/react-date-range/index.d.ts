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
    rangeColors?: string[];
    locale?: object;
    weekdayDisplayFormat?: string;
  }

  interface CalendarProps {
    showMonthAndYearPickers?: boolean;
    date: Date | undefined;
    onChange: (date: Date) => void;
    locale?: object;
    weekdayDisplayFormat?: string;
  }

  export class DateRange extends React.Component<DateRangeProps> {}
  export class Calendar extends React.Component<CalendarProps> {}
}
