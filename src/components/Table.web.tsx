import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { TableProperties, TableColumn } from './Table';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { ehIE } from '../modules/browser';
import { CheckBox } from './CheckBox';

interface State {
  leftHeader: number;
}

interface Props {
  heightContainer: number;
}

export class Table extends React.Component<Props & TableProperties, State> {
  state: State = {
    leftHeader: 0
  };

  static defaultProps = {
    //Top = 60px, padding = 16px, filters = 143px, padding = 16px, header = 45px, padding = 16
    heightContainer: Dimensions.get('window').height - 296
  };

  renderHeaderTable = (headerData: Array<TableColumn>) => {
    const { onSelectAll, data, nativeID } = this.props;
    const { leftHeader } = this.state;

    return (
      <div
        style={{
          overflow: 'hidden',
          position: 'relative',
          height: 45
        }}
      >
        <div
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 8,
            minHeight: 45,
            position: 'absolute',
            left: leftHeader,
            display: 'flex',
            paddingTop: ehIE() ? 15 : 0
          }}
        >
          {headerData.map((column, index) => {
            const headerId = nativeID && `${nativeID}-header-${index + 1}`;

            return column.type === 'checkbox' ? (
              <CheckBox
                nativeID={headerId}
                key={column.key}
                style={{ marginLeft: 8 }}
                value={data.every(x => x.selected) || false}
                onChange={value => onSelectAll && onSelectAll(value)}
              />
            ) : (
              <Text
                nativeID={headerId}
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
            );
          })}
        </div>
      </div>
    );
  };

  renderDataTable = () => {
    const {
      columns,
      data,
      idAttribute,
      cellStyle,
      heightContainer,
      subHeaderData,
      onSelect,
      nativeID
    } = this.props;

    const height = subHeaderData ? heightContainer - 45 : heightContainer;

    return (
      <div
        style={{
          height,
          display: 'flex',
          overflowX: 'scroll',
          overflowY: 'scroll'
        }}
        onScroll={(event: any) => {
          this.setState({ leftHeader: event ? -event.target.scrollLeft : 0 });
        }}
      >
        <div>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={[
                  styles.row,
                  {
                    backgroundColor:
                      index % 2 === 0
                        ? theme.backgroundColor2
                        : theme.backgroundColor1
                  }
                ]}
              >
                {columns.map((column, columnIndex) => {
                  const style =
                    cellStyle &&
                    cellStyle[item[idAttribute].toString()] &&
                    cellStyle[item[idAttribute].toString()][column.key];

                  const cellID =
                    nativeID && `${nativeID}-${index + 1}-${columnIndex + 1}`;

                  return column.type === 'icon' ? (
                    <FontAwesome
                      nativeID={cellID}
                      key={column.key}
                      name={item[column.key].toString()}
                      style={[styles.cellIcon, style, column.style]}
                    />
                  ) : column.type === 'checkbox' ? (
                    <CheckBox
                      nativeID={cellID}
                      key={column.key}
                      style={{ marginLeft: 8 }}
                      value={item.selected || false}
                      onChange={value =>
                        onSelect && onSelect(item[column.key].toString(), value)
                      }
                    />
                  ) : (
                    <Text
                      nativeID={cellID}
                      key={column.key}
                      style={[styles.cell, style, column.style]}
                    >
                      {item[column.key].toString()}
                    </Text>
                  );
                })}
              </View>
            )}
          />
        </div>
      </div>
    );
  };

  render() {
    const { columns, nativeID, subHeaderData } = this.props;

    return (
      <View nativeID={nativeID}>
        {this.renderHeaderTable(columns)}
        {subHeaderData && this.renderHeaderTable(subHeaderData)}
        {this.renderDataTable()}
      </View>
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
    fontFamily: theme.fontFamily2,
    fontSize: 14,
    marginLeft: 8,
    lineHeight: 18,
    color: theme.textColor1
  },
  cellHeader: {
    fontFamily: theme.fontFamily1,
    color: theme.textColor1
  },
  cellIcon: {
    fontSize: 24,
    marginLeft: 8,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
