import React from 'react';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import listTasksQuery from 'queries/tasks/listTasks.gql';
import InfiniteFlatList from 'components/InfiniteFlatList';
import TaskItem from 'components/TaskItem';

const TaskSearch = ({navigation, search}) => {
  const listRef = React.useRef();

  const listProps = React.useMemo(() => {
    return {
      keyExtractor: item => item.id,
      renderItem: ({item}) => (
        <TaskItem
          id={item.id}
          title={item.title}
          otherUsers={item.otherUsers}
          themeColor={'color-primary-500'}
          onPress={() =>
            navigation.navigate('ViewTask', {
              id: item.id,
              onUpdate: listRef.current?.refresh,
            })
          }
        />
      ),
      dataExtractor: data => data.tasks,
    };
  }, [navigation]);

  return (
    <Box flex={1} as={Layout}>
      <Header title="Search Tasks" />
      <InfiniteFlatList
        query={listTasksQuery}
        variables={{
          search,
        }}
        ref={listRef}
        {...listProps}
      />
    </Box>
  );
};

export default TaskSearch;
