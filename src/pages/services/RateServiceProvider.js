import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Layout } from '@ui-kitten/components';
import { useMutation } from 'urql';
import rateServiceProviderMutation from 'queries/services/rateServiceProvider.gql';
import Box from 'components/Box';
import SafeAreaView from 'components/SafeAreaView';
import Header from 'components/Header';
import Button from 'components/Button';
import Input from 'components/Input';
import MultiSelectBoxes from 'components/Forms/Fields/MultiSelectBoxes';
import Icon from 'components/Icon';
import { styles } from './styles';

const RateServiceProvider = ({ navigation, route }) => {
  const [rank, setRank] = useState(0);
  const [text, setText] = useState(null);

  const [rateRes, rateProvider] = useMutation(rateServiceProviderMutation);

  useEffect(() => {
    setRank(route?.params?.review?.rank);
    setText(route?.params?.review?.text);
  }, [route?.params?.review]);

  const rankProvider = React.useCallback(() => {
    rateProvider({
      id: route?.params?.provider?.id,
      rank,
      text,
    });
    route?.params?.onUpdate?.();
    navigation.goBack();
  }, [route?.params, rank, rateProvider, text]);

  const RANK = {
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
  };

  return (
    <Box flex={1} as={Layout}>
      <Box flex={1} as={SafeAreaView} forceInset={{ top: 'always' }}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          style={{
            title: {
              fontWeight: '700',
            },
          }}
          alignment="center"
          title="Rate Service Provider"
          divider
        />
        <MultiSelectBoxes
          values={RANK}
          value={rank}
          onPress={val => setRank(val)}
          activeColor={'#000'}
          icon={'star'}
          activeIcon={'active_star'}
          styles={styles.multiselect}
        />
        <TouchableWithoutFeedback
          height="100%"
          style={{ justifyContent: 'space-between' }}
          onPress={Keyboard.dismiss}
          accessible={false}>
          <Box height="75%">
            <Input
              label={'Write A Review'}
              multiline={true}
              icon={style =>
                Icon('expandInput', 'pm')({ ...style, ...styles.icon })
              }
              textStyle={{ minHeight: 44 }}
              defaultValue={text}
              onChangeText={val => setText(val)}
              size="large"
              containerProps={{
                paddingHorizontal: 20,
                marginTop: 25,
                maxHeight: '80%',
              }}
            />
          </Box>
        </TouchableWithoutFeedback>
        <Button
          onPress={() => rankProvider()}
          style={{ ...styles.completeButton }}
          textStyle={{
            textTransform: 'uppercase',
            fontWeight: '500',
          }}
          size="large">
          Complete
        </Button>
      </Box>
    </Box>
  );
};

export default RateServiceProvider;
