import React from 'react';
import Dialog from './Dialog';
import Input from './Input';

import createTaskCategoryMutation from 'queries/tasks/createTaskCategory.gql';
import {useMutation} from 'urql';

const AddTaskCategoryDialog = ({visible, onHide, onAdd}) => {
  const [name, setName] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [createRes, executeMutation] = useMutation(createTaskCategoryMutation);

  React.useEffect(() => {
    setName(null);
    setError(null);
  }, [visible]);

  const onSubmit = React.useCallback(() => {
    const create = async () => {
      const res = await executeMutation({name});
      if (res?.data?.createTaskCategory?.category) {
        onAdd({
          id: res?.data?.createTaskCategory?.category.id,
          name,
        });
        onHide();
      } else if (res.error) {
        setError(res.error);
      }
    };
    create();
  }, [executeMutation, name, onAdd, onHide]);

  return (
    <Dialog
      visible={!!visible}
      onHide={onHide}
      title="New Task Folder"
      content={
        error ? (
          'Failed to create task folder.'
        ) : (
          <Input
            minWidth={180}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoFocus
          />
        )
      }
      buttons={[
        {
          children: 'Create',
          gradient: true,
          shape: 'circle',
          hide: false,
          disabled: !name?.length || createRes.fetching,
          onPress: onSubmit,
        },
      ]}
    />
  );
};

export default AddTaskCategoryDialog;
