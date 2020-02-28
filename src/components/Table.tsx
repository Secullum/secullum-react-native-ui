import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';

import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';

export interface TableColumn {
  key: string;
  title: string;
  headerStyle?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
  type: 'text' | 'icon';
}

export interface TableCellStyle {
  [id: string]: {
    [column: string]: StyleProp<TextStyle>;
  };
}

export interface TableProperties {
  columns: Array<TableColumn>;
  subHeaderData?: Array<TableColumn>;
  data: Array<any>;
  idAttribute: string;
  style?: StyleProp<ViewStyle>;
  cellStyle?: TableCellStyle;
  nativeID?: string;
}

export class Table extends React.Component<TableProperties> {
  render() {
    const {
      columns,
      data,
      idAttribute,
      style,
      cellStyle,
      nativeID
    } = this.props;

    return (
      <ScrollView horizontal={true}>
        <View nativeID={nativeID} style={style}>
          <View style={styles.row}>
            {columns.map(column => (
              <Text
                key={column.key}
                style={[
                  styles.cell,
                  styles.cellHeader,
                  column.style,
                  column.headerStyle
                ]}
              >
                {column.title}
              </Text>
            ))}
          </View>
          {data.map((row, rowIndex) => (
            <View
              key={row[idAttribute].toString()}
              style={[
                styles.row,
                {
                  backgroundColor:
                    rowIndex % 2 === 0
                      ? theme.backgroundColor2
                      : theme.backgroundColor1
                }
              ]}
            >
              {columns.map(column => {
                const style =
                  cellStyle &&
                  cellStyle[row[idAttribute].toString()] &&
                  cellStyle[row[idAttribute].toString()][column.key];

                return column.type === 'icon' ? (
                  <FontAwesome
                    key={column.key}
                    name={row[column.key].toString()}
                    style={[styles.cellIcon, style, column.style]}
                  />
                ) : (
                  <Text
                    key={column.key}
                    style={[styles.cell, style, column.style]}
                  >
                    {row[column.key].toString()}
                  </Text>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    );
  }
}

const theme = getTheme();

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    minHeight: 45
  },
  cell: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    marginLeft: 8,
    lineHeight: 18,
    color: theme.textColor1
  },
  cellHeader: {
    fontFamily: 'Lato-Bold',
    color: theme.textColor1
  },
  cellIcon: {
    fontSize: 24,
    marginLeft: 8,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
