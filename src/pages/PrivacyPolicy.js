import React from 'react';
import SafeAreaView from 'components/SafeAreaView';
import {Layout} from '@ui-kitten/components';
import Box from 'components/Box';
import Header from 'components/Header';
import Text from 'components/Text';
import {ScrollView} from 'react-native-gesture-handler';

export default function PrivacyPolicy({navigation}) {
  return (
    <Box flex={1} as={Layout} pb={20}>
      <Box flex={1} as={SafeAreaView} forceInset={{top: 'always'}}>
        <Header
          actions={[
            {
              icon: 'arrow-ios-back',
              left: true,
              onPress: () => navigation.goBack(),
            },
          ]}
          alignment="center"
          title="Privacy Policy"
          divider
        />
        <Box as={ScrollView} alwaysBounceVertical={false}>
          <Text category="p2" py="3" px="4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit.{'\n\n'}Sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
            quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
            adipisci velit, sed quia non numquam eius modi tempora incidunt ut
            labore et dolore magnam aliquam quaerat voluptatem.{'\n\n'}Neque
            porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
