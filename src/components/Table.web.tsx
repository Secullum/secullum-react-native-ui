import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import { TableProperties, TableColumn } from './Table';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { ehIE } from '../modules/browser';

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
    //Top = 60px, padding = 16px, filter = 54px, viewFilters = 88px, padding = 16px, header = 53px, padding = 16
    heightContainer: Dimensions.get('window').height - 341
  };

  renderHeaderTable = (data: Array<TableColumn>) => {
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
          {data.map(column => (
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
      heightContainer
    } = this.props;

    return (
      <div
        style={{
          height: heightContainer,
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
                {columns.map(column => {
                  const style =
                    cellStyle &&
                    cellStyle[item[idAttribute].toString()] &&
                    cellStyle[item[idAttribute].toString()][column.key];

                  return column.type === 'icon' ? (
                    <FontAwesome
                      key={column.key}
                      name={item[column.key].toString()}
                      style={[styles.cellIcon, style, column.style]}
                    />
                  ) : (
                    <Text
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
