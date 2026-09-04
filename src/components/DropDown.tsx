import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { IconProps } from 'react-native-vector-icons/Icon';
import { Modal } from './Modal';
import { isTablet } from '../modules/layout';
import { getTheme } from '../modules/theme';
import { getTestID } from '../modules/test';

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
  TextStyle,
  TextInput,
  Keyboard,
  VirtualizedList,
  ListRenderItemInfo,
  KeyboardAvoidingView
} from 'react-native';

type DropDownItemData = {
  label: string;
  value: any;
  icon?: string;
  nativeID?: string;
};

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
        fontFamily: theme.fontFamily1,
        fontSize: 16,
        color: theme.dropDownTextColor
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
                color: theme.textColor1
              })
            ) : (
              <FontAwesome
                name={icon}
                color={theme.textColor1}
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
              color: theme.textColor1
            })
          ) : (
            <FontAwesome
              name={icon}
              color={theme.textColor1}
              style={styles.iconOnly}
            />
          )}
        </View>
      );
    }

    return null;
  };

  render() {
    const { first, last, value, onPress, nativeID } = this.props;

    const theme = getTheme();

    return (
      <TouchableHighlight
        onPress={() => onPress(value)}
        testID={getTestID(nativeID)}
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
  label?: string;
  items: DropDownItemData[];
  value: any | null;
  onChange: (value: any) => void;
  onPress?: () => void | boolean | Promise<void> | Promise<boolean>;
  emptyMessage: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconComponent?: React.ComponentClass<IconProps>;
  nativeID?: string;
  icon?: string | undefined;
  arrowColor?: string | undefined;
  searchable?: SearchableProps;
  virtualized?: true | VirtualizedProps;
  useKeyboardAvoidingView?: boolean;
}

export interface SearchableProps {
  placeHolder: string;
  minItemsToSearch?: number;
}

export interface VirtualizedProps {
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
}

export interface DropDownState {
  modalOpen: boolean;
  searchText: string;
}

const DEFAULT_VIRTUALIZED_PROPS: VirtualizedProps = {
  initialNumToRender: 20,
  maxToRenderPerBatch: 30,
  windowSize: 10
};

export class DropDown extends React.Component<
  DropDownProperties,
  DropDownState
> {
  state: DropDownState = {
    modalOpen: false,
    searchText: ''
  };

  handleItemPress = (value: any) => {
    const { onChange } = this.props;

    this.setState({ modalOpen: false });
    onChange(value);
  };

  filterItems = () => {
    const { items } = this.props;
    const { searchText } = this.state;

    return items.filter(item =>
      item.label.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  shouldDisplaySearchField = () => {
    const { items, searchable } = this.props;
    const defaultQuantityToSearch = 10;

    return (
      searchable &&
      items.length >= (searchable.minItemsToSearch || defaultQuantityToSearch)
    );
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
                  color: theme.textColor1
                })
              ) : (
                <FontAwesome
                  name={item.icon}
                  color={theme.textColor1}
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
              color: theme.textColor1
            })
          ) : (
            <FontAwesome
              name={item.icon}
              color={theme.textColor1}
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
    const { icon, arrowColor } = this.props;

    const styles = StyleSheet.create({
      container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.borderColor1,
        borderRadius: 3,
        ...(icon
          ? {
              flexDirection: 'row',
              minHeight:
                Platform.OS === 'web' || Platform.OS === 'ios' ? 40 : 46
            }
          : {})
      },
      label: {
        color: theme.textColor2,
        fontFamily: theme.fontFamily3,
        fontSize: isTablet() ? 15 : 12,
        lineHeight: 16
      },
      text: {
        lineHeight: isTablet() ? 28 : 22,
        minHeight: isTablet() ? 28 : 22,
        textAlignVertical: 'center',
        color: theme.textColor1,
        fontFamily: theme.fontFamily1,
        fontSize: 16
      },
      textIcon: {
        height: 27,
        alignSelf: 'center',
        color: theme.textColor1,
        fontFamily: theme.fontFamily1,
        fontSize: 16
      },
      seta: {
        color: arrowColor ? arrowColor : theme.textColor1,
        fontSize: 16,
        position: 'absolute',
        bottom: 10,
        right: 16
      },
      setaIcone: {
        color: arrowColor ? arrowColor : theme.textColor1,
        fontSize: 16,
        position: 'absolute',
        bottom: 25,
        right: 16
      },
      modalOverlay: {
        justifyContent: this.shouldDisplaySearchField()
          ? 'flex-start'
          : 'center',
        paddingTop:
          this.shouldDisplaySearchField() && Platform.OS === 'ios' ? 44 : 0
      },
      modalContainer: {
        maxHeight: '95%',
        borderRadius: 5,
        backgroundColor: theme.backgroundColor1,
        margin: 16
      },
      modalItem: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontFamily: theme.fontFamily1,
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
      },
      iconOnLine: {
        color: theme.textColor2,
        fontSize: isTablet() ? 21 : 19,
        marginRight: 10,
        minWidth: 25,
        textAlignVertical: 'center',
        flex: 0
      },
      searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 8,
        marginRight: 16
      },
      searchLabel: {
        fontSize: 16,
        marginLeft: 16,
        fontFamily: theme.fontFamily1
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        flex: 1,
        maxWidth: '100%',
        minWidth: 150,
        overflow: 'hidden',
        marginLeft: 16
      },
      searchInput: {
        flex: 1,
        height: 40
      },
      searchIcon: {
        marginLeft: 10
      }
    });

    return styles;
  };

  renderItemsList = (filteredItems: DropDownItemData[]) => {
    const { iconComponent, virtualized } = this.props;

    const renderItem = ({
      item,
      index
    }: ListRenderItemInfo<DropDownItemData>) => (
      <DropDownItem
        nativeID={item.nativeID}
        first={index === 0}
        last={index === filteredItems.length - 1}
        label={item.label}
        value={item.value}
        onPress={this.handleItemPress}
        icon={item.icon}
        iconComponent={iconComponent}
      />
    );

    if (virtualized == null) {
      return (
        <FlatList
          data={filteredItems}
          initialNumToRender={filteredItems.length}
          keyExtractor={item => item.value.toString()}
          renderItem={renderItem}
        />
      );
    }

    const virtualizedProps: VirtualizedProps =
      typeof virtualized === 'object'
        ? { ...DEFAULT_VIRTUALIZED_PROPS, ...virtualized }
        : DEFAULT_VIRTUALIZED_PROPS;

    return (
      <VirtualizedList
        getItem={(_, index) => filteredItems[index]}
        getItemCount={() => filteredItems.length}
        keyExtractor={item => item.value.toString()}
        renderItem={renderItem}
        initialNumToRender={virtualizedProps.initialNumToRender}
        maxToRenderPerBatch={virtualizedProps.maxToRenderPerBatch}
        windowSize={virtualizedProps.windowSize}
      />
    );
  };

  render() {
    const { modalOpen, searchText } = this.state;
    const {
      label,
      items,
      value,
      emptyMessage,
      style,
      disabledStyle,
      disabled,
      labelStyle,
      inputStyle,
      nativeID,
      onPress,
      icon,
      searchable,
      useKeyboardAvoidingView
    } = this.props;

    const selectedItem = items.find(x => x.value === value);

    const styles = this.getStyles();

    const theme = getTheme();

    const filteredItems = searchable ? this.filterItems() : items;

    const conteudoModal = (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          {this.shouldDisplaySearchField() && (
            <View style={styles.searchContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  nativeID={nativeID + '-text-search'}
                  style={styles.searchInput}
                  value={searchText}
                  placeholder={searchable && searchable.placeHolder}
                  onChangeText={text => this.setState({ searchText: text })}
                />
                <FontAwesome
                  name="search"
                  size={16}
                  color="gray"
                  style={styles.searchIcon}
                />
              </View>
            </View>
          )}
          {filteredItems.length > 0 ? (
            this.renderItemsList(filteredItems)
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
    );

    return (
      <TouchableWithoutFeedback
        onPress={async () => {
          if (onPress) {
            const result = await onPress();

            if (result === false) {
              return;
            }
          }

          this.setState({ modalOpen: true, searchText: '' });
        }}
        disabled={disabled}
      >
        <View
          nativeID={nativeID}
          testID={getTestID(nativeID)}
          style={[
            styles.container,
            style,
            disabled ? [styles.readonly, disabledStyle] : null
          ]}
        >
          {icon ? (
            <FontAwesome name={icon} style={styles.iconOnLine} />
          ) : (
            <Text style={[styles.label, labelStyle]}>{label}</Text>
          )}

          {this.renderClosedDropDown(selectedItem, inputStyle)}
          <Modal
            visible={modalOpen}
            onRequestClose={() => this.setState({ modalOpen: false })}
            overlayStyle={styles.modalOverlay}
          >
            {/*
                Usamos o KeyboardAvoidingView para evitar que o modal fique atrás do teclado 
                no projeto equipamento-virtual, pois como o app usa StatusBar oculta (modo fullscreen), o 
                ajuste automático via adjustResize não funciona corretamente.
              */}
            {useKeyboardAvoidingView ? (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              >
                {conteudoModal}
              </KeyboardAvoidingView>
            ) : (
              conteudoModal
            )}
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
