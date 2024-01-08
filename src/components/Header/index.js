import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  TopNavigation,
  TopNavigationAction,
  styled as uiStyled,
  Button,
} from '@ui-kitten/components';
import useTheme from 'hooks/useTheme';
import Icon from '../Icon';
import Box from '../Box';
import Text from '../Text';
import Input from '../Input';
import { t } from 'helpers/react';
import styled from 'styled-components/native';
import { styles } from './styles';

const Container = styled(Box)`
  border-bottom-color: ${({ theme }) => theme['grey-100']}
  border-bottom-width: ${({ divider }) => (divider ? 1 : 0)};
`;

const ActionContainer = styled(Box)`
  z-index: 1;
  flex-direction: row;
`;

const Header = ({
  actions,
  style,
  themedStyle,
  appearance,
  alignment,
  title,
  subtitle,
  subtitleStyle,
  children,
  search,
  searchValue,
  searchAutoFocus,
  onSearch,
  tranluscent,
  transparent,
  status,
  leftTextStyle,
  leftText,
  onPressLeftText,
  marginTop,
  headerIcon,
  ...props
}) => {
  const [layout, setLayout] = React.useState();
  const theme = useTheme();
  const {
    container,
    leftControlContainer,
    titleContainer,
    rightControlsContainer,
    ...componentStyles
  } = React.useMemo(() => {
    const {
      titleTextAlign,
      titleFontFamily,
      titleFontSize,
      titleLineHeight,
      titleFontWeight,
      titleColor,
      subtitleTextAlign,
      subtitleFontFamily,
      subtitleFontSize,
      subtitleLineHeight,
      subtitleFontWeight,
      subtitleColor,
      ...containerParameters
    } = themedStyle;
    const transparentProps = {
      backgroundColor: 'transparent',
    };
    const tranluscentProps = {
      marginBottom: (layout?.height ?? containerParameters.minHeight) * -1,
      zIndex: 1,
    };
    return {
      container: {
        ...containerParameters,
        ...(transparent || tranluscent ? transparentProps : {}),
        ...(tranluscent ? tranluscentProps : {}),
      },
      titleContainer: {},
      title: {
        // textAlign: titleTextAlign,
        // fontFamily: titleFontFamily,
        // fontSize: titleFontSize,
        // lineHeight: titleLineHeight,
        // fontWeight: titleFontWeight,
        // color: titleColor,
        textTransform: 'uppercase',
      },
      subtitle: {
        // textAlign: subtitleTextAlign,
        // fontFamily: subtitleFontFamily,
        // fontSize: subtitleFontSize,
        // // color: subtitleColor,
        // fontWeight: subtitleFontWeight,
        // lineHeight: subtitleLineHeight,
      },
      leftControlContainer: {},
      rightControlsContainer: {},
    };
  }, [layout, themedStyle, tranluscent, transparent]);

  const renderAction = React.useCallback(
    (
      {
        icon,
        pack = 'eva',
        text,
        left,
        status: buttonStatus,
        badge,
        fill,
        ...action
      },
      i,
    ) => {
      const comp = text ? (
        <Button
          appearance="ghost"
          icon={icon ? Icon(icon, pack) : null}
          status={buttonStatus || status}
          {...action}>
          {text}
        </Button>
      ) : (
        t(
          icon,
          <TouchableOpacity
            activeOpacity={0.7}
            {...action}
            style={styles.actionIconContainer}>
            <TopNavigationAction
              activeOpacity={0.7}
              icon={s =>
                React.cloneElement(Icon(icon, pack)(s), {
                  tintColor:
                    buttonStatus || status
                      ? (buttonStatus || status) === 'control'
                        ? theme['color-basic-100']
                        : theme[`color-${buttonStatus || status}-500`]
                      : null,
                  ...(fill && { fill }),
                })
              }
            />
          </TouchableOpacity>,
        )
      );

      return (
        <Box key={i}>
          {comp}

          {badge ? (
            <Box
              backgroundColor="#FC5457"
              right={0}
              top={-10}
              width={20}
              height={20}
              borderRadius={10}
              position="absolute"
              alignItems="center"
              justifyContent="center">
              <Text category="s2" fontSize={10} status="control">
                {badge}
              </Text>
            </Box>
          ) : null}
        </Box>
      );
    },
    [status, theme],
  );

  const renderLeftActions = React.useCallback(() => {
    const action = actions
      ?.filter(a => a.left && (a?.icon || a?.text))
      .slice(0, 1);
    if (action?.length) {
      return searchValue?.length
        ? renderAction({ icon: 'close', onPress: () => onSearch(null) })
        : action.map(renderAction);
    }
    return null;
  }, [actions, onSearch, renderAction, searchValue]);

  const renderRightActions = React.useCallback(
    () =>
      actions?.filter(a => !a.left && (a?.icon || a?.text)).map(renderAction),
    [actions, renderAction],
  );

  return (
    <Container
      style={[container, style?.container]}
      flexDirection="row"
      marginTop={marginTop}
      alignItems="center"
      justifyContent={alignment === 'center' ? 'space-between' : 'flex-start'}
      onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
      {...props}>
      <ActionContainer style={leftControlContainer}>
        {t(
          leftText,
          <Box as={TouchableOpacity} onPress={onPressLeftText}>
            <Text
              status={status}
              appearance={appearance}
              style={[leftTextStyle, styles.leftText]}>
              {leftText}
            </Text>
          </Box>,
        )}
        {renderLeftActions()}
      </ActionContainer>
      <Box
        flex={1}
        alignSelf="flex-start"
        {...(search && onSearch ? {} : StyleSheet.absoluteFillObject)}>
        <Box
          style={[titleContainer]}
          flex={alignment !== 'center' ? null : 1}
          alignItems="center"
          justifyContent="center"
          position={'absolute'}
          left={0}
          top={0}
          right={0}
          bottom={0}>
          {t(
            headerIcon,
            <Box
              as={Button}
              appearance="ghost"
              icon={style =>
                Icon(
                  status === 'control' ? 'white-header-logo' : 'header-logo',
                  'pm',
                )({ ...style, width: 32, height: 32 })
              }
            />,
          )}
          {search && onSearch ? (
            <Input
              icon={s =>
                Icon(searchValue?.length ? 'close' : 'search')({
                  ...s,
                  tintColor: theme['grey-400'],
                })
              }
              placeholder={typeof search === 'string' ? search : 'Search'}
              shape="rounded"
              onIconPress={() => onSearch(null)}
              value={searchValue}
              autoFocus={searchAutoFocus}
              onChangeText={onSearch}
              size="large"
            />
          ) : (
            <>
              {t(
                title,
                typeof title === 'string' ? (
                  <Text
                    status={status}
                    appearance={appearance}
                    category="label"
                    numberOfLines={1}
                    style={[
                      componentStyles.title,
                      styles.title,
                      style?.title,
                      { flexShrink: 1 },
                    ]}>
                    {title}
                  </Text>
                ) : (
                  title
                ),
              )}

              {subtitle &&
                (typeof subtitle === 'string' ? (
                  <Text
                    category="s3"
                    status={status}
                    appearance="hint"
                    mt="1"
                    color={theme['grey-700']}
                    style={[componentStyles.subtitle, subtitleStyle]}>
                    {subtitle}
                  </Text>
                ) : (
                  subtitle
                ))}
              {children}
            </>
          )}
        </Box>
      </Box>
      <ActionContainer
        style={[rightControlsContainer, style?.rightActions]}
        flex={alignment === 'center' ? null : 1}
        justifyContent={alignment === 'center' ? null : 'flex-end'}>
        {renderRightActions()}
      </ActionContainer>
    </Container>
  );

  // return <TopNavigation {...props} leftControl={renderLeftActions} />;
};

Header.propTypes = TopNavigation.propTypes;
Header.styledComponentName = 'TopNavigation';

export default uiStyled(Header);
