import React, { useState } from 'react';
import { Icon } from '@ui-kitten/components';
import { useMutation } from 'urql';
import commentMutation from 'queries/activity/AddComment.gql';
import { useIsOpen } from 'hooks/useIsOpen';
import Input from 'components/Input';
import Button from 'components/Button';
import Box from 'components/Box';
import { t } from 'helpers/react';
import { colors } from 'styles/theme';

const CommentBox = ({ feedId, refreshFeed }) => {
  const [comment, setComment] = useState();
  const { isOpen: isFocused, close: onBlur, open: onFocus } = useIsOpen();
  const [_, mutate] = useMutation(commentMutation);

  const handleComment = async () => {
    const input = { feedId, comment };
    const res = await mutate({ input });
    if (res?.data?.addComment) {
      setComment('');
      await refreshFeed();
      onBlur();
    }
  };

  return (
    <Box
      backgroundColor={'#fff'}
      justifyContent={'center'}
      position={'relative'}
      height={'100%'}
      borderTopColor={colors['gray scale/10']}
      borderTopWidth={1}
      width={'100%'}>
      <Input
        multiline
        style={styles.input}
        textStyle={styles.inputTxt}
        placeholder={'Write Message...'}
        onFocus={onFocus}
        value={comment}
        onChangeText={setComment}
        onBlur={!comment && onBlur}
        justifyContent={'center'}
        icon={style =>
          t(
            isFocused,
            <Button
              style={styles.btn}
              shadow={false}
              borderRadius={100}
              icon={style => (
                <Icon
                  {...style}
                  name={'arrow-upward-outline'}
                  pack={'eva'}
                  fill={'#22272F'}
                />
              )}
              {...style}
              onPress={handleComment}
            />,
            <Box />,
          )
        }
      />
    </Box>
  );
};

const styles = {
  input: { width: '100%', zIndex: 1, backgroundColor: '#fff' },
  inputTxt: { minHeight: '100%' },
  btn: {
    borderRadius: 100,
    height: 18,
    width: 18,
    backgroundColor: colors['gray scale/5'],
    zIndex: 10,
    borderWidth: 0,
  },
};

export default CommentBox;
