import React from 'react';
import Box from 'components/Box';
import Button from 'components/Button';
import LazyScreen from 'utils/LazyScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormError from 'components/Forms/FormError';
import Form from 'components/Form';
import WorkTabFields from './workTabFields';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles'

const WorkTab = ({ watching, setValue, onSubmit }) => {
    const navigation = useNavigation();
    return (
        <LazyScreen>
            <KeyboardAwareScrollView enableResetScrollToCoords={false}>
                <Box px={15}>
                    <Form onSubmit={onSubmit}>
                        <FormError />
                        <WorkTabFields
                            watching={watching}
                            setValue={setValue}
                        />
                        <Button textStyle={styles.saveButtonText} style={styles.saveButton} onPress={() => navigation.navigate('DocumentsTab')}>
                            NEXT
                        </Button>
                    </Form>
                </Box>
            </KeyboardAwareScrollView>
        </LazyScreen>
    )
};

export default WorkTab;