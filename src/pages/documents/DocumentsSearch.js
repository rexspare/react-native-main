import React from 'react';
import Header from 'components/Header';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import DocumentList from 'components/DocumentList';

const DocumentsSearch = ({search}) => {
  return (
    <Box as={Layout} flex={1}>
      <Header title="Search Documents" />
      <DocumentList search={search} />
    </Box>
  );
};

export default DocumentsSearch;
