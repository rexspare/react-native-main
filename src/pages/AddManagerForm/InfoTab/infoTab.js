import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Box from 'components/Box';
import Button from 'components/Button';
import SafeAreaView from 'components/SafeAreaView';
import FormError from 'components/Forms/FormError';
import Form from 'components/Form';
import InfoTabFormFields from './infoTabFormFields';
import { infoDisabled } from '../schema';
import LazyScreen from 'utils/LazyScreen';
import { styles } from '../styles';

const InfoTab = ({ watching, setValue, onSubmit }) => {
  const navigation = useNavigation();
  const isDisabled = infoDisabled(watching);
  return (
    <Box as={SafeAreaView} flex={1}>
      <LazyScreen>
        <KeyboardAwareScrollView enableResetScrollToCoords={false}>
          <Box px={15}>
            <Form onSubmit={onSubmit}>
              <FormError />
              <InfoTabFormFields watching={watching} setValue={setValue} />
              <Button
                disabled={!isDisabled}
                textStyle={styles.saveButtonText}
                style={[styles.saveButton, !isDisabled && styles.disableButton]}
                onPress={() => isDisabled && navigation.navigate('WorkTab')}>
                NEXT
              </Button>
            </Form>
          </Box>
        </KeyboardAwareScrollView>
      </LazyScreen>
    </Box>
  );
};

export default InfoTab;
