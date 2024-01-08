import Text from 'components/Text';
import React, { useState } from 'react';
import { View } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Box from 'components/Box';
import { Icon } from '@ui-kitten/components';
import { styles } from './styles';

const AccordionView = ({ sections }) => {

  const [state, setState] = useState({
    activeSections: [],
  })

  const _renderHeader = (section, i, isActive) => {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        ...styles.header,
        ...(i === sections.length - 1 && styles.headerLast)
      }}
      >
        <Text style={styles.headerText}>{section.title}</Text>
        <Icon
          name={isActive ? 'minus' : 'plus'}
          width={15}
          height={15}
        />
      </View>
    );
  };

  const _renderContent = (section, i) => {
    return (
      <View style={styles.content}>
        <Box>{section.content}</Box>
      </View>
    );
  };

  const _updateSections = (activeSections) => {
    setState({ activeSections });
  };
  return (
    <Accordion
      sections={sections}
      activeSections={state.activeSections}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      onChange={_updateSections}
      underlayColor="#eee"
    />
  )
};


export default AccordionView;