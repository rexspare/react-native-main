import React, { useMemo } from 'react';
import { useQuery } from 'urql';
import viewMaintenanceRequestQuery from 'queries/tasks/viewMaintenanceRequest.gql';
import Box from 'components/Box';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import { dateFormat } from 'constants/dateFormat';
import {
  stringifyEnumValue,
  TASK_PRIORITY,
  MAINTENANCE_REQUEST_STATUSES,
  MAINTENANCE_TIME_PREFERENCES_OPTIONS
} from 'constants/enums';
import GalleryInput from 'components/Forms/Fields/GalleryInput';
import { format } from "helpers/date";
import HeadedScreen from 'components/HeadedScreen';
import { getActions } from 'constants/actions';
import { colors } from 'styles/theme';
import { typography } from "styles/typography";
import BorderedText from "components/BorderedText";
import Features from 'components/Features';
import { style } from "./style";
import ActivityFeedButton from 'components/ActivityFeed/ActivityFeedButton';
import Divider from 'components/Divider';
import { t } from 'helpers/react';
import ActivityFeed from 'components/ActivityFeed';
import FeaturesTab from 'components/ProfilePage/FeaturesTab';

const priorityColors = {
  [TASK_PRIORITY.HIGH]: 'success',
  [TASK_PRIORITY.MEDIUM]: 'info',
  [TASK_PRIORITY.LOW]: 'primary',
};


const ViewMaintenanceRequest = ({ navigation, route }) => {
  const taskId = route.params?.id;
  const theme = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const [res, executeQuery] = useQuery({
    query: viewMaintenanceRequestQuery,
    variables: {
      id: taskId,
    },
  });

  const request = res.data?.maintenanceRequest;
  const task = request?.task;

  React.useEffect(() => {
    if (refreshing && !res.fetching) {
      setRefreshing(false);
      route.params?.onUpdate?.();
    }
    navigation.setParams({ taskStatus: task?.status });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.fetching]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    executeQuery({ requestPolicy: 'network-only' });
  }, [executeQuery]);

  const requestStatusDisplay = React.useMemo(() => {
    if (request?.status === MAINTENANCE_REQUEST_STATUSES.OPEN) {
      return 'Open';
    }
    return 'Closed';
  }, [request]);

  const actions = useMemo(() => getActions(
    ['back', { onPress: () => navigation.goBack({ status: task?.status }) }],
    ["export", {
      onPress: () => null,
      disable: true, height: 21, width: 21, marginTop: 3
    }],
    ["editIcon", {
      onPress: () => navigation.navigate('EditRequest', {
        id: request?.id,
        onUpdate: onRefresh,
      }), disable: true, height: 21, width: 21, marginTop: 3
    }]
  ), [navigation, request]);

  const ActivityJsx = (
    <Box>
      {task?.files?.length ? (<>
        <Text style={{
          paddingHorizontal: 7,
          marginLeft: 8,
          marginRight: 8,
          marginTop: 20,
          ...typography["heading-medium"],
          color: colors['gray scale/40'],
        }}>FILES</Text>

        <Box px={3} backgroundColor={colors['white']}>
          <GalleryInput
            mt={10}
            value={task.files.map(f => ({
              uri: f.url,
              type: f.fileType,
              name: f.url.split("/")[f.url.split("/").length - 1]
            }))}
            readOnly
            download
          />
        </Box>
        <Divider width="91%" mt={3} mx={3} />
      </>
      ) : null}
      <Text style={{
        paddingHorizontal: 7,
        marginLeft: 8,
        marginRight: 8,
        marginVertical: 20,
        ...typography["body/medium – medium"],
        color: colors['gray scale/40'],
      }}>ACTIVITY</Text>
      <ActivityFeed
        feedId={task?.activityFeed?.pk}
        comments={false}
        limit={2}
        contentContainerStyle={null}
      />
      <ActivityFeedButton title={"See more Activity"} feedId={task?.activityFeed?.pk} />
      {request?.status == 2 && <>
        <Divider width="91%" my={3} mx={3} />
        <Features
          styles={style.features}
          features={[
            { label: "Created By", content: task?.user?.fullName, },
            { label: "Date Created", content: task?.createdAt ? format(new Date(task.createdAt), dateFormat) : '' }
          ]}
        />
      </>}
    </Box>
  );

  return (
    <HeadedScreen
      refreshing={refreshing}
      onRefresh={onRefresh}
      title={'Request'}
      backgroundColor={colors["white"]}
      actions={actions}
      style={{
        title: {
          ...typography['body/large – Bold']
        },
      }}
      headerStyle={{ backgroundColor: colors['white'] }}
      divider
      scrollable>
      <Box flex={1} bg={colors["gray scale/5"]}>
        <Box backgroundColor={colors['white']} py={3} mb={3} px="3">
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Text style={{ ...typography["body/large – Bold"], textTransform: 'uppercase' }}>
              {task?.title}
            </Text>
            <Box flexDirection="row">
              <BorderedText px={3} py={1} my="2" br={8} bw={0}
                bgc={colors["primary/brand"]}
                c={colors['white']}
                styles={{ text: { ...typography["body/x-small – regular"], textTransform: 'uppercase' } }}
                text={requestStatusDisplay} />
              {task?.priority ? (
                <BorderedText
                  px={3} py={1} my="2" br={8} bw={0} ml="2"
                  bgc={theme[`color-${priorityColors[task.priority]}-500`]}
                  c={colors['white']}
                  styles={{ text: { ...typography["body/x-small – regular"], textTransform: 'uppercase' } }}
                  text={stringifyEnumValue(TASK_PRIORITY, task?.priority)} />
              ) : null}
            </Box>
          </Box>
          <Divider my="3" />
          {request?.date ? <Box>
            <Text style={{ ...typography['buttons/large'], color: colors["gray scale/40"] }}>
              SCHEDULED
            </Text>
            <Box mt={1} flexDirection="row" flexWrap="wrap">
              <Text style={{ ...typography['body/medium – regular'] }}>
                {`${format(new Date(request?.date), dateFormat)}, `}
              </Text>
              {request?.timePreference.map((e, i) => {
                const item = MAINTENANCE_TIME_PREFERENCES_OPTIONS.find(
                  i => i.id === e,
                );
                return (
                  <Text style={{ ...typography['body/medium – regular'] }}>{i < request?.timePreference.length - 1 ? `${item.text}, ` : `${item.text}`}</Text>
                );
              })}
            </Box>
          </Box> : null}
          {t(task?.content, <Box mt={3}>
            <Text style={{ ...typography['buttons/large'], color: colors["gray scale/40"] }}>
              DESCRIPTION
            </Text>
            <Box mt={1} >
              <Text style={{ ...typography['body/medium – regular'] }}>{task?.content}</Text>
            </Box>
          </Box>)}
        </Box>
        <FeaturesTab
          styles={{
            features: {
              container: {
              },
              label: {
                ...typography['body/medium – regular'],
                color: colors['gray scale/40'],
                textTransform: "capitalize"
              },
              content: {
                ...typography['body/medium – regular'],
                color: colors['gray scale/90'],
              },
              row: {
                height: 'auto',
                minHeight: 54,
                borderColor: colors['gray scale/10'],
                paddingHorizontal: 7,
              },
            },
          }}
          labelProps={{ numberOfLines: 2 }}
          features={[
            { label: "Permission to enter if no one’s Home", content: request?.enterPermission ? 'Yes' : 'No' },
            { label: "Additional details / entry instructions", content: request?.additionalDetails || "N/A" },
          ]}
          featuresChildren={ActivityJsx}
        />
      </Box>
    </HeadedScreen>
  );
};

export default ViewMaintenanceRequest;
