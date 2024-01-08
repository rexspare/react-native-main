import React from 'react';
import ActivityFeedModal from 'components/ActivityFeed/ActivityFeedModal';
import Button from 'components/Button';
import { useIsOpen } from 'hooks/useIsOpen';
import { chain } from 'helpers/func';
import Box from 'components/Box';
import { button_styles } from 'styles/button';

const ActivityFeedButton = ({
  modalProps,
  navigation,
  unit,
  title,
  url,
  feedId,
  listProps,
  ...props
}) => {
  const { isOpen, close, open } = useIsOpen();
  const handlePrevTenant = chain([
    pageName => navigation.navigate(pageName, { screen: 'ViewTenant', unit }),
    () => close(),
  ]);

  return (
    <>
      <Box
        as={Button}
        mx={3}
        my={3}
        onPress={url ? () => handlePrevTenant(url) : open}
        children={title}
        {...button_styles['bordered_clear']}
        {...props}
      />
      <ActivityFeedModal
        modalProps={{ visible: isOpen, onHide: close }}
        listProps={listProps}
        feedId={feedId}
      />
    </>
  );
};

export default ActivityFeedButton;
