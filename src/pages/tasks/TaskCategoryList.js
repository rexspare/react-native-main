import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Layout } from '@ui-kitten/components';
import Box from 'components/Box';
import useAuth from 'hooks/useAuth';
import TaskCategoryBox from 'components/TaskCategoryBox';
import { TASK_LIST_CATEGORIES } from './consts';

const categories = TASK_LIST_CATEGORIES;

const TaskCategoryList = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <Box flex={1} dir as={Layout} p="2">
      <FlatList
        data={categories}
        dataExtractor={item => item}
        renderItem={
          ({item: { name, filterField, categoryName = name, icon}}) =>  
            <TaskCategoryBox
              name={name}
              icon={icon}
              onPress={() => navigation.navigate('ListTasks', { categoryName, categoryFilter: filterField && { [filterField]: user.id } })}
            />
        }
      />
    </Box>
  );
};

export default TaskCategoryList;
