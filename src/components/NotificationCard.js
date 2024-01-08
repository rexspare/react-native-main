import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Collapsible from 'react-native-collapsible';
import useTheme from 'hooks/useTheme';
import Box from './Box';
import Text from './Text';
import { stringifyEnumValue, NOTIFICATION_TYPES } from 'constants/enums';
import styled from 'styled-components/native';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';

const Shadow = styled(Box)`
  border-color:${colors['gray scale/10']}
  border-width: 1;
  background-color: ${({ theme }) => theme['background-basic-color-1']};
`;

const styles = {
  viewBTn: {
    borderColor: colors['primary/50'],
    borderWidth: 1,
    width: '90%',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginVertical: '3%',
    borderRadius: 8,
    marginLeft: 10,
  },
  btnText: {
    ...typography.textUppercase,
    ...typography['body/small – medium'],
    color: colors['primary/50'],
  },
};
const Card = styled(Box)`
  background-color: ${({ theme }) => theme['background-basic-color-1']};
`;
const NotificationCard = ({
  title,
  body,
  createdAt,
  notificationType,
  ...props
}) => {
  const theme = useTheme();
  const [collapsed, setCollapsed] = React.useState(true);
  const navigation = useNavigation();
  const createdAtTz = new Date(createdAt);

  const convertCreatedDate = time => {
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const timeString = `${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;
    return timeString;
  };

  return (
    <Shadow mx={15} my="8px" borderRadius={12} {...props}>
      <Card overflow="hidden" borderRadius={12}>
        <Box mx={15} my={10}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            mb="2">
            <Box
              opacity={
                stringifyEnumValue(NOTIFICATION_TYPES, notificationType) ? 1 : 0
              }
              borderRadius={8}
              backgroundColor={colors['gray scale/20']}
              px="2"
              mt={1}
              py="1">
              <Text
                category="c1"
                status="primary"
                style={{
                  ...typography.textUppercase,
                  ...typography['body/small – normal'],
                  color: '#131F1E',
                }}>
                {stringifyEnumValue(NOTIFICATION_TYPES, notificationType)}
              </Text>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Text category="p2" color={theme['grey-400']} fontSize={12}>
                {convertCreatedDate(createdAtTz)}
              </Text>
            </Box>
          </Box>
          <Text
            mb="4px"
            fontSize={16}
            style={{
              ...typography.textUppercase,
              ...typography['body/small – bold'],
              color: '#131F1E',
            }}>
            {title}
          </Text>
          <Text
            category="p2"
            color={colors['gray scale/60']}
            fontSize={16}
            style={{ ...typography['body/medium – regular'] }}>
            {body}
          </Text>
          <Collapsible collapsed={collapsed}>
            <Box minHeight={60}>
              <Text category="p2" mt="2">
                {body}
              </Text>
            </Box>
          </Collapsible>
          <Box
            my="2"
            mt="3"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            {props.task?.id &&
            [
              NOTIFICATION_TYPES.TASK_ASSIGNMENT,
              NOTIFICATION_TYPES.TASK_REMINDER,
              NOTIFICATION_TYPES.TASK_UPDATE,
              NOTIFICATION_TYPES.MAINTENANCE_REQUEST,
              NOTIFICATION_TYPES.LEASE_RENEWAL,
            ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1" marginLeft={279}>
                <TouchableOpacity
                  style={styles.viewBTn}
                  onPress={() =>
                    navigation.navigate('ViewTask', {
                      id: props.task?.id,
                    })
                  }>
                  <Text style={styles.btnText}>VIEW</Text>
                </TouchableOpacity>
              </Box>
            ) : null}
            {props.event?.id &&
            [
              NOTIFICATION_TYPES.EVENT_ASSIGNMENT,
              NOTIFICATION_TYPES.EVENT,
              NOTIFICATION_TYPES.EVENT_REMINDER,
            ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1" marginLeft={279}>
                <TouchableOpacity
                  style={styles.viewBTn}
                  onPress={() =>
                    navigation.navigate('EditEvent', { id: props.event?.id })
                  }>
                  <Text style={styles.btnText}>VIEW</Text>
                </TouchableOpacity>
              </Box>
            ) : null}
            {props.lease?.id &&
            [
              NOTIFICATION_TYPES.LEASE_SIGNED,
              NOTIFICATION_TYPES.LEASE_APPROVED,
              NOTIFICATION_TYPES.LEASE_REJECTED,
              NOTIFICATION_TYPES.LEASE_RENEWAL,
            ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1" marginLeft={279}>
                <TouchableOpacity
                  style={styles.viewBTn}
                  onPress={() =>
                    navigation.navigate('LandlordTenants', {
                      navigate: ['ViewTenant', { id: props.lease?.id }],
                    })
                  }>
                  <Text style={styles.btnText}>VIEW</Text>
                </TouchableOpacity>
              </Box>
            ) : null}
            {[
              NOTIFICATION_TYPES.COLLECT_RENT,
              NOTIFICATION_TYPES.APPROVE_PAYMENT,
            ].indexOf(notificationType) !== -1 && props.task?.id ? (
              <Box flex={1} mx="1" marginLeft={279}>
                <TouchableOpacity
                  style={styles.viewBTn}
                  onPress={() =>
                    navigation.navigate('ViewTask', { id: props.task?.id })
                  }>
                  <Text style={styles.btnText}>VIEW</Text>
                </TouchableOpacity>
              </Box>
            ) : null}
            {props.payment?.lease?.id &&
            [
              NOTIFICATION_TYPES.COLLECT_RENT,
              NOTIFICATION_TYPES.APPROVE_PAYMENT,
            ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1" marginLeft={279}>
                <TouchableOpacity
                  style={styles.viewBTn}
                  onPress={() =>
                    navigation.navigate('LandlordTenants', {
                      navigate: [
                        'ViewTenant',
                        { id: props.payment?.lease?.id },
                      ],
                    })
                  }>
                  <Text style={styles.btnText}>VIEW</Text>
                </TouchableOpacity>
              </Box>
            ) : null}
            {props.user?.id &&
            [NOTIFICATION_TYPES.MAINTENANCE_REQUEST].indexOf(
              notificationType,
            ) !== -1 ? (
              <Box flex={1} mx="1" marginLeft={279}>
                <TouchableOpacity
                  style={styles.viewBTn}
                  onPress={() =>
                    navigation.navigate('LandlordTenants', {
                      navigate: ['ViewTenant', { id: props.user?.id }],
                    })
                  }>
                  <Text style={styles.btnText}>VIEW</Text>
                </TouchableOpacity>
              </Box>
            ) : null}
            {props.building?.id &&
            [NOTIFICATION_TYPES.BUILDING_ASSIGNMENT].indexOf(
              notificationType,
            ) !== -1 ? (
              <Box flex={1} mx="1" marginLeft={279}>
                <TouchableOpacity
                  style={styles.viewBTn}
                  onPress={() =>
                    navigation.navigate('ViewProperty', {
                      id: props.building?.id,
                    })
                  }>
                  <Text style={styles.btnText}>VIEW</Text>
                </TouchableOpacity>
              </Box>
            ) : null}
            {/* {[
              NOTIFICATION_TYPES.LEASE_APPROVED,
              NOTIFICATION_TYPES.LEASE_REJECTED,
              NOTIFICATION_TYPES.LEASE_APPROVAL,
            ].indexOf(notificationType) !== -1 ? (
              <Box flex={1} mx="1" marginLeft={279}>
                <TouchableOpacity
                  style={styles.viewBTn}
                  onPress={() =>
                    Linking.openURL(props.lease?.agreementDoc?.url)
                  }>
                  <Text style={styles.btnText}>VIEW</Text>
                </TouchableOpacity>
              </Box>
            ) : null} */}
          </Box>
        </Box>
      </Card>
    </Shadow>
  );
};

export default NotificationCard;
