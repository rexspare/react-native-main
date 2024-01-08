import React from 'react';
import { Layout } from '@ui-kitten/components';
import TaskCategoryList from 'pages/tasks/TaskCategoryList';
import Box from 'components/Box';

const TaskListRoot = ({ navigation, ...props }) => {
  return (
    <Box flex={1} as={Layout} {...props}>
      <TaskCategoryList navigation={navigation} />
    </Box>
  );
};

export default TaskListRoot;
