import React from 'react';
import Box from 'components/Box';
import Text from 'components/Text';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';
import { format } from 'helpers/date';
import { MAINTENANCE_TIME_PREFERENCES_OPTIONS } from 'constants/enums';
import { standardDateFormat } from 'constants/dateFormat';
import Calendar from 'img/icons/calendar_black.svg';
import { colors } from 'styles/theme';
import { getCreatedFeatures, getFeatureReminderFeatures } from '../styles';
import { typography } from 'styles/typography';

const ViewTaskInfoSection = ({ task, ...props }) => {
  const timePreference = () => {
    const items = MAINTENANCE_TIME_PREFERENCES_OPTIONS.filter(e => {
      return task?.maintenanceRequest?.timePreference?.indexOf(e.id) > -1;
    });

    return (
      <Box py={2}>
        {items.map(e => (
          <Box flexDirection="row" alignItems="center" marginBottom={1}>
            <Calendar
              style={{ marginRight: 10 }}
              fill="#727978"
              width="20"
              height="20"
            />
            <Text style={{ fontSize: 16 }}>{e.text}</Text>
          </Box>
        ))}
      </Box>
    );
  };

  const additionalDetails = () => {
    return (
      <Box px={1} pl={3}>
        <Text style={{
          ...typography['body/medium – regular'],
          color: colors['gray scale/90'],
        }}>{task?.maintenanceRequest?.additionalDetails}</Text>
      </Box>
    );
  };

  return (
    <FeaturesTab
      features={[
        {
          label: 'Due Date',
          content: format(task?.due, standardDateFormat, '', {
            toDate: true,
          }),
        },
        {
          label: 'Reminder',
          content: task?.reminder
            ? getFeatureReminderFeatures(task?.reminder)
            : '',
        },
        {
          label: 'Building',
          content: task?.building?.address ?? '',
        },
        {
          label: 'Unit',
          content: task?.unit?.unitNumber ?? '',
        },
        {
          label: 'Address',
          content: task?.building
            ? task?.building?.address +
            ` , ${task?.building?.city}` +
            ` , ${task?.building?.state} ${task?.building?.zip}`
            : '',
        },
        {
          label: 'Location',
          content: task?.maintenanceRequest?.location ?? '',
        },
        {
          label: 'Has permission to enter if tenant is not home',
          content: task?.maintenanceRequest
            ? task?.maintenanceRequest.enterPermission
              ? 'YES'
              : 'NO'
            : '',
        },
        {
          label: 'Time Preference',
          contentJsx: task?.maintenanceRequest?.timePreference
            ? timePreference()
            : '',
        },
        {
          label: 'Additional Details',
          contentJsx: task?.maintenanceRequest?.additionalDetails
            ? additionalDetails()
            : '',
        },
        {
          label: 'Created By',
          content: task?.systemTask ? 'Tigra App' : task?.user?.fullName,
        },
        {
          label: 'Date Created',
          content: getCreatedFeatures(task?.createdAt),
        },
      ]}
      containerProps={{ mt: 3 }}
      styles={{
        features: {
          label: {
            ...typography['body/medium – regular'],
            color: colors['gray scale/40'],
          },
          labelBox: {
            maxWidth: '90%',
          },
          content: {
            ...typography['body/medium – regular'],
            color: colors['gray scale/90'],
            maxWidth: '70%',
          },
          row: {
            height: 'auto',
            minHeight: 54,
            borderColor: colors['gray scale/10'],
            paddingHorizontal: 10,
          },
        },
      }}
    />
  );
};

export default ViewTaskInfoSection;
