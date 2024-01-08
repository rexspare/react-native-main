import React from 'react';
import Box from 'components/Box';
import Input from 'components/Input';
import Icon from 'components/Icon';
import { colors } from 'styles/theme';

export const renderChildren = ({ search, setSearch }) => (
  <Box
    mb={3}
    style={{
      borderBottomWidth: 1,
      borderBottomColor: colors['gray scale/10'],
    }}>
    <Input
      icon={Icon('search')}
      placeholder="Search"
      size={'large'}
      value={search}
      onChangeText={text => setSearch(text)}
      style={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}
    />
  </Box>
);
