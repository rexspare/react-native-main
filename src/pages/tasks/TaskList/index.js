import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import listTasksQuery from 'queries/tasks/listTasks.gql';
import { useGetListProps } from 'hooks/useGetListProps';
import useFilter from 'hooks/useFilter';
import useTheme from 'hooks/useTheme';
import { usePermissions, PERMISSION_SECTIONS } from 'hooks/usePermissions';
import useTaskStatusSetter from 'hooks/useTaskStatusSetter';
import InfiniteFlatList from 'components/InfiniteFlatList';
import MultiTextSwitch from 'components/MultiTextSwitch';
import Box from 'components/Box';
import Text from 'components/Text';
import TaskItem from 'components/TaskItem';
import Divider from 'components/Divider';
import Dialog from 'components/Dialog';
import RestoreTaskModal from 'components/TaskItem/RestoreTaskModal/index.';
import { t } from 'helpers/react';
import { buttons } from 'constants/buttons';
import { sectionExtractor, _getSections } from 'helpers/list';
import { TASK_STATUSES, stringifyEnumValue } from 'constants/enums';
import {
  checkStatusAction,
  taskStatusColorMap,
  uncheckStatusAction,
} from '../consts';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { styles } from './styles';

const FilterButton = ({ title, onPress, bgColor, value, style}) => {
  const textStyle = [
    { color: colors['white'] },
    typography['body/small – normal'],
  ];
  return (
    <Box
      width={'48%'}
      height={65}
      padding={2}
      alignItems={'center'}
      onPress={onPress}
      as={TouchableOpacity}
      style={[styles?.filterButtonContainer, style?.container]}
      backgroundColor={bgColor}>
      <Text style={[textStyle, style?.title]} >{title}</Text>
      <Box
        flexDirection="row"
        style={{ justifyContent: 'space-between', marginTop: 2 }}>
        <Text
          style={[
            textStyle,
            { ...typography['Capital/small – regular'] },
            style?.title,
          ]}>
          {value}
        </Text>
      </Box>
    </Box>
  );
};

const TaskList = ({ navigation, route }) => {
  const [restoreModalProps, setRestoreModalProps] = useState({
    visible: false,
  });
  const [statusFilter, setStatusFilter] = useState(TASK_STATUSES.TO_DO);
  const [textWidth, setTextWidth] = useState({});
  const [{ overdueCount, recentCount }, setCounts] = useState({});
  const listRef = useRef();
  const [isRecent, setIsRecent] = useState(true);
  const theme = useTheme();
  const [filter] = useFilter(['tasksFeed']);
  const permissions = usePermissions(PERMISSION_SECTIONS.TASKS);
  const [sections, setSections] = useState([]);
  const variables = React.useMemo(() => ({ ...filter?.tasksFeed }), [
    filter?.tasksFeed,
  ]);
  const onRemove = React.useCallback((id, status) => {
    listRef.current?.removeItem(id);
    setStatusFilter(status);
  }, []);
  const { onSetStatus, modalProps, successModal } = useTaskStatusSetter(
    statusFilter,
    onRemove,
  );
  const today = new Date();

  useEffect(() => {
    const value = Object.keys(TASK_STATUSES).find(
      k => TASK_STATUSES[k] === statusFilter,
    );
    if (value.length >= 9) {
      setTextWidth({
        width: '20%',
        marginLeft: '4.5%',
      });
    } else if (value.length >= 8) {
      setTextWidth({
        width: '15%',
        marginLeft: '4%',
      });
    } else if (value.length >= 5) {
      setTextWidth({
        width: '7%',
        marginLeft: '5.5%',
      });
    } else {
      setTextWidth({
        width: '6%',
        marginLeft: '5%',
      });
    }
  }, [statusFilter]);

  const listFilter = React.useMemo(
    () => ({
      ...(route?.params?.categoryFilter ?? {}),
      status: statusFilter,
      recentDate: today,
      overdueDate: today,
      [!isRecent ? 'dueMax' : 'dueMin']: today,
      ...variables,
    }),
    [route, statusFilter, isRecent, today, variables],
  );

  const isOnArchived = statusFilter === TASK_STATUSES.ARCHIVED;
  const isOnDone = statusFilter === TASK_STATUSES.DONE;

  const getItemProps = (item, isOnArchived) => {
    const navigationOptions = {
      id: item.id,
      onUpdate: listRef.current?.refresh,
      taskEditPermission: permissions?.edit,
    };
    const onSwipablePress = () =>
      isOnArchived
        ? setRestoreModalProps({ taskId: item.id, visible: true })
        : onSetStatus(item.id, TASK_STATUSES.ARCHIVED);
    const rightButton = {
      ...buttons[isOnArchived ? 'restore' : 'archive'],
      onPress: onSwipablePress,
    };

    return {
      themeColor: taskStatusColorMap[statusFilter],
      rightButton,
      initialChecked: isOnDone,
      onPress: () =>
        permissions?.view
          ? navigation.navigate('ViewTask', navigationOptions)
          : null,
      onCheck:
        !item.systemTask &&
        checkStatusAction[statusFilter] &&
        (() => onSetStatus(item.id, checkStatusAction[statusFilter])),
      onUnCheck:
        !item.systemTask &&
        uncheckStatusAction[statusFilter] &&
        (() => onSetStatus(item.id, uncheckStatusAction[statusFilter])),
      showRightBar: true,
      _styles: {
        container: {
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors['gray scale/10'],
        },
      },
      statusFilter,
      ...item,
    };
  };

  const listProps = useGetListProps(
    {
      keyExtractor: item => item.id,
      renderItem: ({ item }) => (
        <TaskItem {...getItemProps(item, isOnArchived)} />
      ),
      onResCallback: res => {
        getSections(res?.data);
        setCounts({
          recentCount: res?.data?.recentCount?.totalCount,
          overdueCount: res?.data?.overdueCount?.totalCount,
        });
      },
      dataExtractor: data => data.tasks,
      sections,
      sectionExtractor: item =>
        sectionExtractor({ date: item?.due, df: 'MMMM dd yyyy' }),
      renderSectionHeader: section =>
        renderSectionHeader(section, {
          ...typography['body/medium – medium'],
          color: colors['gray scale/40'],
        }),
    },
    [
      navigation,
      onRemove,
      onSetStatus,
      statusFilter,
      isOnArchived,
      recentCount,
      sections.length,
    ],
  );

  const getSections = _data => {
    const sections = _getSections(_data?.tasks?.edges, 'due', 'MMMM dd yyyy');
    setSections(sections);
  };

  const renderList = useCallback(() => {
    return (
      <Box flex={1} position="relative">
        <InfiniteFlatList
          contentContainerStyle={{ paddingBottom: 50 }}
          key={statusFilter}
          refreshOnLoad
          query={listTasksQuery}
          variables={listFilter}
          ref={listRef}
          ListEmptyComponent={
            <Text
              mt={4}
              alignSelf={'center'}
              borderWidth={1}
              styles={typography['body/large – medium']}
              appearance="hint">
              NO TASKS
            </Text>
          }
          {...listProps}
        />
      </Box>
    );
  }, [listProps, statusFilter, listRef, isRecent, variables]);

  return (
    <>
      <MultiTextSwitch
        shape="circle"
        size="small"
        options={Object.values(TASK_STATUSES).map(value => ({
          text: stringifyEnumValue(TASK_STATUSES, value),
          themeColor: taskStatusColorMap[value],
          value,
        }))}
        onSelect={option => setStatusFilter(option.value)}
        value={statusFilter - 1}
        style={{
          width: '91%',
          marginHorizontal: '4.5%',
          marginTop: 10,
          backgroundColor: 'transparent',
          borderWidth: 0,
          switchBackground: {
            elevation: 0,
            shadowColor: 'transparent',
            backgroundColor: 'transparent',
            borderBottomWidth: 2,
            borderRadius: 0,
            borderBottomColor: colors['primary/50 – brand'],
            ...textWidth,
          },
          activeTextColor: colors['gray scale/90'],
        }}
        textColor={{ color: colors['primary/50 – brand'] }}
      />
      <Divider mt={3} />
      {t(
        !(variables.dueMin || variables.dueMax),
        <Box py={1} px={3} flexDirection="row" justifyContent={'space-between'}>
          <FilterButton
            icon="flag"
            title="RECENT"
            value={recentCount || 0}
            isSelected={isRecent}
            onPress={() => setIsRecent(true)}
            style={
              !isRecent
                ? {
                    container: {
                      borderBottomWidth: 1,
                      borderColor: theme['primary/50'],
                    },
                    title: { color: theme['primary/50'] },
                  }
                : null
            }
            bgColor={isRecent ? theme['primary/50'] : 'transparent'}
          />
          <FilterButton
            icon="overdue"
            title="OVERDUE"
            value={overdueCount || 0}
            isSelected={!isRecent}
            onPress={() => setIsRecent(false)}
            style={
              isRecent
                ? {
                    container: {
                      borderBottomWidth: 1,
                      borderColor: colors['primary/brand'],
                    },
                    title: { color: colors['primary/brand'] },
                  }
                : null
            }
            bgColor={!isRecent ? colors['primary/brand'] : 'transparent'}
          />
        </Box>,
      )}
      {renderList()}
      <Dialog {...modalProps} />
      {successModal}
      {t(
        isOnArchived,
        <RestoreTaskModal
          {...restoreModalProps}
          onHide={() => setRestoreModalProps({ visible: false })}
        />,
      )}
    </>
  );
};

export const renderSectionHeader = ({ section }, textProps) => {
  return (
    <Box
      as={Layout}
      pt="3"
      mb="2"
      px="3"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <Text
        category="h6"
        style={styles.dateTextStyle}
        appearance="hint"
        {...textProps}>
        {section.title}
      </Text>
    </Box>
  );
};

export default TaskList;
