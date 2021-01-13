import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { IconProps } from 'react-native-vector-icons/Icon';
import { Modal } from './Modal';
import { isTablet } from '../modules/layout';
import { getTheme } from '../modules/theme';

import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
  Platform,
  TextStyle
} from 'react-native';

interface DropDownItemProperties {
  first: boolean;
  last: boolean;
  label: string;
  value: any;
  icon?: string;
  iconComponent?: React.ComponentClass<IconProps>;
  onPress: (value: any) => void;
  nativeID?: string;
}

class DropDownItem extends React.PureComponent<DropDownItemProperties> {
  getStyles = (): any => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      modalItem: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontFamily: 'Roboto',
        fontSize: 16,
        color: theme.textColor3
      },
      icon: {
        fontSize: 26
      },
      rowView: {
        flexDirection: 'row'
      },
      iconView: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconOnlyView: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconOnly: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 60
      }
    });

    return styles;
  };

  renderOpenDropDownItem = () => {
    const { label, icon, iconComponent, nativeID } = this.props;

    const theme = getTheme();
    const styles = this.getStyles();

    if (label && icon) {
      return (
        <View nativeID={nativeID} style={styles.rowView}>
          <View style={styles.iconView}>
            {iconComponent ? (
              React.createElement(iconComponent, {
                name: icon,
                style: styles.icon,
                color: theme.textColor3
              })
            ) : (
              <FontAwesome
                name={icon}
                color={theme.textColor3}
                style={styles.icon}
              />
            )}
          </View>
          <View>
            <Text style={styles.modalItem}>{label}</Text>
          </View>
        </View>
      );
    } else if (label && !icon) {
      return (
        <View nativeID={nativeID} style={styles.rowView}>
          <Text style={styles.modalItem}>{label}</Text>
        </View>
      );
    } else if (!label && icon) {
      return (
        <View nativeID={nativeID} style={styles.iconOnlyView}>
          {iconComponent ? (
            React.createElement(iconComponent, {
              name: icon,
              style: styles.iconOnly,
              color: theme.textColor3
            })
          ) : (
            <FontAwesome
              name={icon}
              color={theme.textColor3}
              style={styles.iconOnly}
            />
          )}
        </View>
      );
    }

    return null;
  };

  render() {
    const { first, last, value, onPress } = this.props;

    const theme = getTheme();

    return (
      <TouchableHighlight
        onPress={() => onPress(value)}
        underlayColor={theme.backgroundColor2}
        style={{
          borderTopLeftRadius: first ? 5 : 0,
          borderTopRightRadius: first ? 5 : 0,
          borderBottomLeftRadius: last ? 5 : 0,
          borderBottomRightRadius: last ? 5 : 0
        }}
      >
        {this.renderOpenDropDownItem()}
      </TouchableHighlight>
    );
  }
}

export interface DropDownProperties {
  label: string;
  items: Array<{ label: string; value: any; icon?: string; nativeID?: string }>;
  value: any | null;
  onChange: (value: any) => void;
  emptyMessage?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconComponent?: React.ComponentClass<IconProps>;
  nativeID?: string;
}

export interface DropDownState {
  modalOpen: boolean;
}

export class DropDown extends React.Component<
  DropDownProperties,
  DropDownState
> {
  static defaultProps = {
    emptyMessage: 'Não há registros cadastrados'
  };

  state: DropDownState = {
    modalOpen: false
  };

  handleItemPress = (value: any) => {
    const { onChange } = this.props;

    this.setState({ modalOpen: false });
    onChange(value);
  };

  renderClosedDropDown = (item: any, inputStyle: any) => {
    const { iconComponent } = this.props;

    const theme = getTheme();
    const styles = this.getStyles();

    if (!item) {
      return (
        <>
          <Text style={[styles.text, inputStyle]}>-</Text>
          <FontAwesome name="caret-down" style={styles.seta} />
        </>
      );
    } else if (item.label && item.icon) {
      return (
        <>
          <View style={styles.rowView}>
            <View style={styles.iconView}>
              {iconComponent ? (
                React.createElement(iconComponent, {
                  name: item.icon,
                  style: styles.icon,
                  color: theme.textColor3
                })
              ) : (
                <FontAwesome
                  name={item.icon}
                  color={theme.textColor3}
                  style={styles.icon}
                />
              )}
            </View>
            <Text style={[styles.textIcon, inputStyle]}>{item.label}</Text>
          </View>

          <FontAwesome name="caret-down" style={styles.seta} />
        </>
      );
    } else if (item.label && !item.icon) {
      return (
        <>
          <Text style={[styles.text, inputStyle]}>{item.label}</Text>
          <FontAwesome name="caret-down" style={styles.seta} />
        </>
      );
    } else if (!item.label && item.icon) {
      return (
        <>
          {iconComponent ? (
            React.createElement(iconComponent, {
              name: item.icon,
              style: styles.iconOnly,
              color: theme.textColor3
            })
          ) : (
            <FontAwesome
              name={item.icon}
              color={theme.textColor3}
              style={styles.iconOnly}
            />
          )}
          <FontAwesome name="caret-down" style={styles.setaIcone} />
        </>
      );
    }

    return null;
  };

  getStyles = (): any => {
    const theme = getTheme();

    const styles = StyleSheet.create({
      container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.borderColor1,
        borderRadius: 3
      },
      label: {
        color: theme.textColor2,
        fontFamily: 'Roboto-Light',
        fontSize: isTablet() ? 15 : 12,
        lineHeight: 16
      },
      text: {
        lineHeight: 22,
        minHeight: 22,
        alignSelf: 'flex-start',
        color: theme.textColor3,
        fontFamily: 'Roboto-Medium',
        fontSize: 16
      },
      textIcon: {
        height: 27,
        alignSelf: 'center',
        color: theme.textColor3,
        fontFamily: 'Roboto',
        fontSize: 16
      },
      seta: {
        color: theme.textColor3,
        fontSize: 16,
        position: 'absolute',
        bottom: 10,
        right: 16
      },
      setaIcone: {
        color: theme.textColor3,
        fontSize: 16,
        position: 'absolute',
        bottom: 25,
        right: 16
      },
      modalOverlay: {
        justifyContent: 'center'
      },
      modalContainer: {
        borderRadius: 5,
        backgroundColor: theme.backgroundColor1,
        margin: 16
      },
      modalItem: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontFamily: 'Roboto',
        fontSize: 16
      },
      emptyMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
      },
      readonly: {
        backgroundColor: theme.disabledColor
      },
      icon: {
        fontSize: 26
      },
      rowView: {
        flexDirection: 'row'
      },
      iconView: {
        width: 50,
        alignItems: 'center'
      },
      iconOnlyView: {
        width: 200,
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconOnly: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 26
      }
    });

    return styles;
  };

  render() {
    const { modalOpen } = this.state;
    const {
      label,
      items,
      value,
      emptyMessage,
      style,
      disabled,
      labelStyle,
      inputStyle,
      iconComponent,
      nativeID
    } = this.props;

    const selectedItem = items.find(x => x.value === value);

    const styles = this.getStyles();

    const theme = getTheme();

    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ modalOpen: true })}
        disabled={disabled}
      >
        <View
          nativeID={nativeID}
          style={[styles.container, style, disabled ? styles.readonly : null]}
        >
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {this.renderClosedDropDown(selectedItem, inputStyle)}
          <Modal
            visible={modalOpen}
            onRequestClose={() => this.setState({ modalOpen: false })}
            overlayStyle={styles.modalOverlay}
          >
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalContainer,
                  Platform.OS === 'web' && {
                    marginVertical: '10px',
                    marginHorizontal: 'auto',
                    width: '90%',
                    maxWidth: 450,
                    maxHeight: 300,
                    justifyContent: 'center'
                  }
                ]}
              >
                {items.length > 0 ? (
                  <FlatList
                    data={items}
                    initialNumToRender={items.length}
                    keyExtractor={item => item.value.toString()}
                    renderItem={({ item, index }) => {
                      return (
                        <DropDownItem
                          nativeID={item.nativeID}
                          first={index === 0}
                          last={index === items.length - 1}
                          label={item.label}
                          value={item.value}
                          onPress={this.handleItemPress}
                          icon={item.icon}
                          iconComponent={iconComponent}
                        />
                      );
                    }}
                  />
                ) : (
                  <View style={styles.emptyMessageContainer}>
                    <FontAwesome
                      name="warning"
                      color={theme.warningColor}
                      size={24}
                    />
                    <Text style={styles.modalItem}>{emptyMessage}</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
