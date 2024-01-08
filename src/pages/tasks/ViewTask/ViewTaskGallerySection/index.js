import React from 'react';
import GalleryInput from 'components/Forms/Fields/GalleryInput';
import ViewTaskSection from '../ViewTaskSection';
import { colors } from 'styles/theme';

const ViewTaskGallerySection = ({ files, theme }) => {
  if (!files) return null;
  return (
    <ViewTaskSection
      styles={{
        content: { mx: 0 },
        container: { my: 0 },
        label: { color: colors['gray scale/40'] },
      }}
      label={'Files'}
      display={files?.length}
      theme={theme}>
      <GalleryInput
        value={files?.map(f => ({
          uri: f.url,
          type: f.fileType,
        }))}
        readOnly
      />
    </ViewTaskSection>
  );
};

export default ViewTaskGallerySection;
