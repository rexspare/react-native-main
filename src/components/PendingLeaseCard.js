import React from 'react';
import Box from './Box';
import styled from 'styled-components/native';
import {Image, Linking, Animated, Dimensions} from 'react-native';
import Text from './Text';
import {Layout} from '@ui-kitten/components';
import Button from 'components/Button';
import GradientButton from './GradientButton';
import Collapsible from 'react-native-collapsible';
import approveLeaseMutation from 'queries/rentals/approveLease.gql';
import {useMutation} from 'urql';
import FastImage from 'react-native-fast-image';

const Shadow = styled(Box)`
  shadow-opacity: 0.25;
  shadow-radius: 8;
  shadow-color: #000;
  shadow-offset: {height: 1, width: 2};
  elevation: 10;
  background-color: ${({theme}) => theme['background-basic-color-1']};
`;

const PendingLeaseCard = ({id, unit, leaseUrl, onRemove, onRefresh}) => {
  const [layout, setLayout] = React.useState();
  const [collapsed, setCollapsed] = React.useState(false);
  const [remAnimation] = React.useState(new Animated.Value(0));
  const dims = Dimensions.get('window');

  const [approveRes, approveLease] = useMutation(approveLeaseMutation);

  const animate = React.useCallback(
    toValue => {
      setCollapsed(!!toValue);
      Animated.timing(remAnimation, {
        toValue,
        duration: 1000,
      }).start(() => onRemove?.());
    },
    [onRemove, remAnimation],
  );

  const onApprove = React.useCallback(
    approved => {
      const approve = async () => {
        const res = await approveLease({
          id,
          approved,
        });
        onRefresh?.();
        if (res.data?.approveTenantLease?.success) {
          animate(1);
        }
      };
      approve();
    },
    [animate, approveLease, id, onRefresh],
  );

  return (
    <Shadow
      py="8px"
      px="3"
      borderRadius={7}
      as={Animated.View}
      onLayout={({nativeEvent: {layout}}) => setLayout(layout)}
      style={{
        marginBottom: remAnimation.interpolate({
          inputRange: [0, 0.2, 1],
          outputRange: [0, 0, -170],
        }),
        transform: [
          {
            translateX: remAnimation.interpolate({
              inputRange: [0, 0.35, 1],
              outputRange: [0, -dims.width, -dims.width],
            }),
          },
        ],
      }}>
      <Box overflow="hidden" borderRadius={7} as={Layout}>
        <Box
          height={170}
          as={FastImage}
          source={
            unit.building?.photos?.[0]
              ? {uri: unit.building.photos[0]}
              : require('img/placeholder-building.jpeg')
          }
        />
        <Collapsible collapsed={collapsed}>
          <Box py="2" px="3" as={Animated.View} overflow="hidden">
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between">
              <Box>
                <Text category="h3">{unit.building.address}</Text>
                <Text category="h4">Apt. {unit.unitNumber}</Text>
              </Box>
              {leaseUrl ? (
                <Button
                  appearance="ghost"
                  onPress={() => Linking.openURL(leaseUrl)}>
                  View Lease
                </Button>
              ) : null}
            </Box>
            <Box
              width={0.7}
              pt="3"
              justifyContent="space-between"
              alignSelf="center">
              <Box flex={1} p="1">
                <Button shape="circle" onPress={() => onApprove(true)}>
                  Approve
                </Button>
              </Box>
              <Box flex={1} p="1">
                <Button
                  status="danger"
                  appearance="ghost"
                  size="small"
                  onPress={() => onApprove(false)}>
                  Dismiss
                </Button>
              </Box>
            </Box>
          </Box>
        </Collapsible>
      </Box>
    </Shadow>
  );
};

export default PendingLeaseCard;
