import React from 'react';
import BorderedText from 'components/BorderedText';
import Box from 'components/Box';
import Text from 'components/Text';
import ViewTaskSection from '../ViewTaskSection';
import Divider from 'components/Divider';
import Persona from 'components/Persona';
import { t } from 'helpers/react';
import { stringifyEnumValue, TASK_PRIORITY } from 'constants/enums';
import { colors } from 'styles/theme';
import styled from 'styled-components/native';
import { typography } from 'styles/typography';

const priorityColors = {
  [TASK_PRIORITY.HIGH]: 'primary2',
  [TASK_PRIORITY.MEDIUM]: 'grey',
  [TASK_PRIORITY.LOW]: 'primary',
  [TASK_PRIORITY['N/A']]: 'primary',
};

const ViewTaskHeaderSection = ({
  title,
  priority,
  taskType,
  unit,
  content,
  building,
  maintenanceRequest,
  assignees,
  theme,
  styles: { avatar, ...customStyles } = {},
  ...props
}) => {
  return (
    <Box px={20}>
      <Box flexDirection="row" justifyContent="space-between">
        <TEXT
          width="80%"
          ml="-2px"
          mt="2"
          fontSize={18}
          fontWeight={'bold'}
          color={colors['gray scale/90']}>
          {title}
        </TEXT>
        <Box
          mt={1}
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center">
          {t(
            priority,
            <BorderedText
              c={'#fff'}
              bw={0}
              py={0.5}
              styles={{
                text: {
                  fontSize: 12,
                  textTransform: 'uppercase',
                },
              }}
              bgc={theme[`color-${priorityColors[priority]}-500`]}
              textProps={{ status: 'control' }}
              text={stringifyEnumValue(TASK_PRIORITY, priority)}
            />,
          )}
        </Box>
      </Box>
      <Divider mt={20} mb={20} />
      <ViewTaskSection
        my={0}
        label={'Assigned To'}
        display={assignees?.length}
        theme={theme}
        styles={{
          ...customStyles,
          content: { mt: 0 },
          label: {
            color: colors['gray scale/40'],
            my: 0,
            ...typography['heading-medium'],
          },
        }}
        {...props}>
        {assignees?.map(({ node: assignee }, i) => (
          <Persona
            key={assignee.id}
            profile={assignee.picture}
            name={assignee.fullName}
            title={assignee.title}
            width={1}
            styles={avatar}
          />
        ))}
      </ViewTaskSection>
      <ViewTaskSection
        display={content}
        label={'Description'}
        theme={theme}
        styles={{
          content: { mx: 0, my: 0 },
          container: { my: 0, pt: 0, mb: 2 },
          label: {
            marginTop: 0,
            color: colors['gray scale/40'],
            ...typography['heading-medium'],
          },
        }}>
        <Text
          category="p2"
          appearance="hint"
          color={colors['gray scale/90']}
          fontSize={16}
          lineHeight={24}
          mb={3}>
          {content}
        </Text>
      </ViewTaskSection>
    </Box>
  );
};

export default ViewTaskHeaderSection;

export const TEXT = styled(Text).attrs(({ ...styles }) => ({
  ...styles,
}))`
  text-transform: uppercase;
`;
