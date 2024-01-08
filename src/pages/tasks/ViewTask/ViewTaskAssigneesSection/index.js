import Persona from 'components/Persona';
import React from 'react';
import ViewTaskSection from '../ViewTaskSection';


const ViewTaskAssigneesSection = ({
  assignees,
  theme,
  styles: { avatar, ...customStyles } = {},
  ...props
}) => {
  if (!assignees) return null;
  return (
    <ViewTaskSection
      label={'Assigned To'}
      display={assignees?.length}
      theme={theme}
      divider
      styles={{ ...customStyles }}
      {...props}>
      {assignees.map(({ node: assignee }, i) => (
        <Persona
          key={assignee.id}
          profile={assignee.picture}
          name={assignee.fullName}
          title={assignee.title}
          width={1}
          styles={avatar}
        />
      ))}
    </ViewTaskSection>
  );
};

export default ViewTaskAssigneesSection;
