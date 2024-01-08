import React from 'react';
import styled from 'styled-components/native';
import Input from './Input';
import Icon from './Icon';
import Box from './Box';
import { View, Dimensions, Platform } from 'react-native';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Modal from './Modal';
import { Layout, Menu, MenuItem, Divider } from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import InfiniteFlatList from './InfiniteFlatList';
import FullPageBottomModal from 'components/FullPageBottomModal';

const GhostInput = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SELECT_BOX_SIZE = 200;

const SelectInput = (
  {
    caption,
    autoFocus,
    label,
    flex,
    mx,
    my,
    mb,
    mt,
    ml,
    mr,
    onFocus,
    onBlur,
    onSelect,
    onEmptySelect,
    icon = 'arrow-down',
    options = [],
    listProps = {},
    autoSelect = false,
    emptyOption,
    initiallyEmpty,
    styles,
    showFullPageModal=false,
    ...props
  },
  ref,
) => {
  const theme = useTheme();
  const [focused, setFocused] = React.useState(autoFocus);
  const [layout, setLayout] = React.useState({});
  const [isUnsetValue, setIsUnsetValue] = React.useState(!initiallyEmpty);
  const layoutRef = React.useRef();
  const screen = Dimensions.get('window');

  const measure = React.useCallback(
    focus =>
      layoutRef.current &&
      layoutRef.current.measureInWindow((x, y, width, height, ...other) => {
        setLayout({x, y, width, height});
        focus && setFocused(true);
      }),
    [],
  );

  React.useLayoutEffect(() => {
    measure();
  }, [measure]);

  React.useEffect(() => {
    if (props.value && isUnsetValue) {
      setIsUnsetValue(false);
    }
  }, [isUnsetValue, props.value]);

  const onFocusProxy = React.useCallback(
    (...args) => {
      if (onFocus) {
        onFocus(...args);
      }
      if (layout.x && layout.y && layout.width && layout.height) {
        setFocused(true);
      }
      measure(true);
    },
    [layout.height, layout.width, layout.x, layout.y, measure, onFocus],
  );

  const onBlurProxy = React.useCallback(
    (...args) => {
      if (onBlur) {
        onBlur(...args);
      }
      setFocused(false);
    },
    [onBlur],
  );

  const onSelectProxy = React.useCallback(
    (index, ...args) => {
      if (onSelect) {
        onSelect(Array.isArray(options) ? options?.[index] : index);
      }
      setIsUnsetValue(false);
      onBlurProxy();
    },
    [onBlurProxy, onSelect, options],
  );

  React.useEffect(() => {
    if (options?.length && autoSelect && !props.value) {
      onSelectProxy(0);
    }
  }, [autoSelect, onSelectProxy, options, props.value]);

  const renderOptions = React.useCallback(() => {
    const renderEmpty = () => {
      return <MenuItem title="No Options" disabled />;
    };
    const onEmptySel = () => {
      if (onEmptySelect) {
        onBlurProxy();
        onEmptySelect();
      } else {
        onSelectProxy(null);
      }
    };
    const EmptyOptionComponent = emptyOption ? (
      <MenuItem
        {...(onEmptySelect
          ? {titleStyle: {color: theme['color-primary-500']}}
          : {})}
        title={emptyOption}
        {...Platform.select({
          ios: {onPress: onEmptySel},
          android: {onPress: onEmptySel}, // for some reason onPress not working}
        })}
      />
    ) : null;
    if (Array.isArray(options)) {
      return (
        <Menu
          {...listProps}
          bounces={false}
          onSelect={onSelectProxy}
          data={options}
          ListFooterComponent={() => EmptyOptionComponent}
          ListEmptyComponent={renderEmpty}
        />
      );
    } else {
      const {labelExtractor, ...lProps} = listProps;
      return (
        <InfiniteFlatList
          {...lProps}
          refresh={false}
          query={options}
          bounces={false}
          onLoad={data => {
            if (data?.length && autoSelect && !props.value) {
              onSelectProxy(data[0]);
            }
          }}
          InListFooterComponent={EmptyOptionComponent}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item, index}) => (
            <MenuItem
              title={labelExtractor?.(item) ?? item.title}
              {...Platform.select({
                ios: {onPress: () => onSelectProxy(item)},
                android: {onPressIn: () => onSelectProxy(item)}, // for some reason onPress not working}
              })}
            />
          )}
          ListEmptyComponent={renderEmpty}
        />
      );
    }
  }, [
    autoSelect,
    emptyOption,
    listProps,
    onBlurProxy,
    onEmptySelect,
    onSelectProxy,
    options,
    props.value,
    theme,
  ]);

  const above =
    screen.height - ((layout?.y ?? 0) + (layout?.height ?? 0)) - 30 <=
    SELECT_BOX_SIZE;

  return (
    <>
      <Box {...{flex, mx, my, mb, mt, ml, mr}} position="relative" {...styles?.dropdownContainer} >
        <View pointerEvents="none">
          <Input
            {...props}
            label={label}
            icon={icon ? Icon(icon,'pm') : null}
            style={{opacity: 0}}
            value={props.value || (isUnsetValue ? null : emptyOption)}
          />
        </View>
        <GhostInput>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={props.disabled}
            onPress={onFocusProxy}
            onBlur={onBlurProxy}>
            <View ref={layoutRef} onLayout={() => null}>
              <View pointerEvents="none">
                <Input
                  {...props}
                  icon={icon ? (style) => Icon(icon,'pm')({ width: 15, height:  10, marginRight: 10}) : null}
                  ref={ref}
                  isRequired={false}
                  onFocus={onFocusProxy}
                  onBlur={onBlurProxy}
                  value={props.value || (isUnsetValue ? null : emptyOption)}
                />
              </View>
            </View>
          </TouchableOpacity>
        </GhostInput>
      </Box>
      {!showFullPageModal ? <Modal visible={!!focused} onHide={onBlurProxy} mountAlways>
        <TouchableWithoutFeedback onPress={onBlurProxy}>
          <Box
            as={Layout}
            width={layout?.width ?? 0}
            maxHeight={SELECT_BOX_SIZE}
            position="absolute"
            left={layout?.x ?? 0}
            top={
              above
                ? (layout?.y ?? 0) - (layout?.height ?? 0)
                : (layout?.y ?? 0) + (layout?.height ?? 0)
            }
            // bottom={above ? layout?.y ?? 0 : null}
            overflow="hidden"
            py="1"
            borderRadius={theme['border-radius-rounded']}>
            {renderOptions()}
          </Box>
        </TouchableWithoutFeedback>
      </Modal> :
        <FullPageBottomModal displayDone={false} visible={!!focused} onHide={onBlurProxy} title={label}>
          <TouchableWithoutFeedback onPress={onBlurProxy}>
            <Box>
              {renderOptions()}
            </Box>
          </TouchableWithoutFeedback>
        </FullPageBottomModal>}
    </>
  );
};

SelectInput.isInput = true;

const SelectInputForward = React.forwardRef(SelectInput);
SelectInputForward.isInput = true;
export default SelectInputForward;
