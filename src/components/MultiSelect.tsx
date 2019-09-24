import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getTheme } from '../modules/theme';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
  Dimensions
} from 'react-native';
import { isTablet } from '../modules/layout';
import { IconProps } from 'react-native-vector-icons/Icon';
import { Button, Space, Modal, CheckBox } from '..';

interface MultiSelectItemProperties {
  label: string;
  value: any;
  checked: boolean;
  handleAdd: (value: any) => void;
  handleRemove: (value: any) => void;
  icon?: string;
  iconComponent?: React.ComponentClass<IconProps>;
}

class MultiSelectItem extends React.Component<MultiSelectItemProperties> {
  getStyles = (): any => {
    const theme = getTheme();

    const width = Dimensions.get('screen').width;

    const styles = StyleSheet.create({
      text: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        flexWrap: 'wrap',
        maxWidth: width - 150,
        color: theme.textColor1
      },
      icon: {
        fontSize: 26
      },
      rowView: {
        flexDirection: 'row',
        paddingLeft: 16
      },
      checkbox: {
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
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

  renderWithLabelAndIcon = (label: string, icon: string) => {
    const { value, iconComponent, handleAdd, handleRemove } = this.props;

    const theme = getTheme();
    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
        <View style={styles.checkbox}>
          <CheckBox
            value={this.props.checked}
            onChange={() => {
              if (this.props.checked) {
                handleRemove(value);
              } else {
                handleAdd(value);
              }
            }}
          />
        </View>
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
          <Text style={styles.text}>{label}</Text>
        </View>
      </View>
    );
  };

  renderWithLabel = (label: string) => {
    const { value, handleAdd, handleRemove } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
        <View style={styles.checkbox}>
          <CheckBox
            value={this.props.checked}
            onChange={() => {
              if (this.props.checked) {
                handleRemove(value);
              } else {
                handleAdd(value);
              }
            }}
          />
        </View>
        <Text style={styles.text}>{label}</Text>
      </View>
    );
  };

  renderWithIcon = (icon: string) => {
    const { value, iconComponent, handleAdd, handleRemove } = this.props;

    const theme = getTheme();
    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
        <View style={styles.checkbox}>
          <CheckBox
            value={this.props.checked}
            onChange={() => {
              if (this.props.checked) {
                handleRemove(value);
              } else {
                handleAdd(value);
              }
            }}
          />
        </View>
        <View style={styles.iconOnlyView}>
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
      </View>
    );
  };

  render() {
    const { label, icon } = this.props;

    if (label && icon) {
      return this.renderWithLabelAndIcon(label, icon);
    } else if (label && !icon) {
      return this.renderWithLabel(label);
    } else if (!label && icon) {
      return this.renderWithIcon(icon);
    }

    return null;
  }
}

export interface MultiSelectProperties {
  label: string;
  items: Array<{ label: string; value: any; icon?: string }>;
  values: any[] | null;
  onChange: (value: any) => void;
  selectedAllDescription?: string;
  selectedManyDescription?: string;
  selectedNoneDescription?: string;
  okButtonDescription?: string;
  cancelButtonDescription?: string;
  emptyMessage?: string;
  disabled?: boolean;
  iconComponent?: React.ComponentClass<IconProps>;
}

export interface MultiSelectState {
  modalOpen: boolean;
  selectedValues: any[];
  selectedValuesInitial: any[];
}

export class MultiSelect extends React.Component<
  MultiSelectProperties,
  MultiSelectState
> {
  static defaultProps = {
    emptyMessage: 'Não há registros cadastrados',
    selectedAllDescription: 'Todos',
    selectedManyDescription: 'Vários',
    selectedNoneDescription: 'Nenhum',
    okButtonDescription: 'Ok',
    cancelButtonDescription: 'Cancelar'
  };

  state: MultiSelectState = {
    modalOpen: false,
    selectedValues: [],
    selectedValuesInitial: []
  };

  componentDidMount = () => {
    this.setState({
      selectedValues: this.props.values || [],
      selectedValuesInitial: this.props.values || []
    });
  };

  componentDidUpdate = (prevProps: MultiSelectProperties) => {
    if (prevProps.values !== this.props.values) {
      this.setState({
        selectedValues: this.props.values || [],
        selectedValuesInitial: this.props.values || []
      });
    }
  };

  handleAddValue = (value: any) => {
    this.setState({ selectedValues: [...this.state.selectedValues, value] });
  };

  handleRemoveValue = (value: any) => {
    this.setState({
      selectedValues: this.state.selectedValues.filter(x => x !== value)
    });
  };

  handleSave = () => {
    const { onChange } = this.props;
    const { selectedValues } = this.state;

    this.setState({ modalOpen: false, selectedValuesInitial: selectedValues });
    onChange(selectedValues);
  };

  renderClosedWithNone = () => {
    const { selectedNoneDescription } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
        <Text style={styles.text}>{selectedNoneDescription}</Text>
        <FontAwesome name="caret-down" style={styles.seta} />
      </View>
    );
  };

  renderClosedWithAll = () => {
    const { selectedAllDescription } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
        <Text style={styles.text}>{selectedAllDescription}</Text>
        <FontAwesome name="caret-down" style={styles.seta} />
      </View>
    );
  };

  renderClosedWithOneLabel = (label: string) => {
    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
        <Text style={styles.text}>{label}</Text>
        <FontAwesome name="caret-down" style={styles.seta} />
      </View>
    );
  };

  renderClosedWithOneIcon = (icon: string) => {
    const { iconComponent } = this.props;

    const theme = getTheme();
    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
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
        <FontAwesome name="caret-down" style={styles.seta} />
      </View>
    );
  };

  renderClosedWithOneLabelAndIcon = (label: string, icon: string) => {
    const { iconComponent } = this.props;

    const theme = getTheme();
    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
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
        <View style={styles.textView}>
          <Text style={styles.text}>{label}</Text>
        </View>
        <FontAwesome name="caret-down" style={styles.seta} />
      </View>
    );
  };

  renderClosedWithOne = (label?: string, icon?: string) => {
    if (label && icon) {
      return this.renderClosedWithOneLabelAndIcon(label, icon);
    } else if (label && !icon) {
      return this.renderClosedWithOneLabel(label);
    } else if (!label && icon) {
      return this.renderClosedWithOneIcon(icon);
    }

    return null;
  };

  renderClosedWithMany = () => {
    const { selectedManyDescription } = this.props;

    const styles = this.getStyles();

    return (
      <View style={styles.rowView}>
        <Text style={styles.text}>{selectedManyDescription}</Text>
        <FontAwesome name="caret-down" style={styles.seta} />
      </View>
    );
  };

  renderClosedMultiSelect = (items: any, numOptions: number) => {
    if (items.length === 0) {
      return this.renderClosedWithNone();
    } else if (items.length === numOptions) {
      return this.renderClosedWithAll();
    } else if (items.length === 1) {
      return this.renderClosedWithOne(items[0].label, items[0].icon);
    } else {
      return this.renderClosedWithMany();
    }
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
        fontFamily: 'Lato-Regular',
        fontSize: isTablet() ? 15 : 12,
        lineHeight: 16
      },
      textView: {
        flexDirection: 'column',
        justifyContent: 'center'
      },
      text: {
        height: 27,
        alignSelf: 'flex-start',
        color: theme.textColor1,
        fontFamily: 'Lato-Bold',
        fontSize: 16
      },
      seta: {
        color: theme.textColor1,
        fontSize: 16,
        position: 'absolute',
        bottom: 0,
        right: 0
      },
      modalOverlay: {
        justifyContent: 'center',
        paddingBottom: 16,
        paddingTop: 16
      },
      modalContainer: {
        borderRadius: 5,
        backgroundColor: theme.backgroundColor1,
        margin: 16
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
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconOnly: {
        fontSize: 30,
        paddingLeft: 16
      },
      buttonCancelar: {
        flex: 1,
        backgroundColor: theme.backgroundColor1
      },
      buttonOk: {
        flex: 1
      },
      buttons: {
        flexDirection: 'row',
        padding: 16
      }
    });

    return styles;
  };

  render() {
    const { modalOpen, selectedValues, selectedValuesInitial } = this.state;
    const {
      label,
      items,
      emptyMessage,
      disabled,
      iconComponent,
      okButtonDescription,
      cancelButtonDescription
    } = this.props;

    const selectedItems = items.filter(x => selectedValues.includes(x.value));

    const styles = this.getStyles();

    const theme = getTheme();

    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({ modalOpen: true })}
        disabled={disabled}
      >
        <View style={[styles.container, disabled ? styles.readonly : null]}>
          <Text style={styles.label}>{label}</Text>
          {this.renderClosedMultiSelect(selectedItems, items.length)}
          <Modal visible={modalOpen} overlayStyle={styles.modalOverlay}>
            <View
              style={[
                styles.modalContainer,
                Platform.OS === 'web' && {
                  margin: 'auto',
                  width: '90%',
                  maxWidth: 450,
                  justifyContent: 'center',
                  marginBottom: '10px',
                  marginTop: '10px'
                }
              ]}
            >
              {items.length > 0 ? (
                <FlatList
                  data={items}
                  initialNumToRender={items.length}
                  keyExtractor={item => item.value.toString()}
                  extraData={selectedValues}
                  renderItem={({ item }) => {
                    return (
                      <MultiSelectItem
                        label={item.label}
                        value={item.value}
                        icon={item.icon}
                        iconComponent={iconComponent}
                        handleAdd={value => this.handleAddValue(value)}
                        handleRemove={value => this.handleRemoveValue(value)}
                        checked={selectedValues.includes(item.value)}
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
                  <Text style={styles.text}>{emptyMessage}</Text>
                </View>
              )}
              <View style={styles.buttons}>
                <Button
                  text={cancelButtonDescription || 'Cancelar'}
                  style={styles.buttonCancelar}
                  primary={false}
                  onPress={() => {
                    this.setState({
                      modalOpen: false,
                      selectedValues: selectedValuesInitial
                    });
                  }}
                />
                <Space width={20} />
                <Button
                  text={okButtonDescription || 'Ok'}
                  style={styles.buttonOk}
                  onPress={this.handleSave}
                />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
