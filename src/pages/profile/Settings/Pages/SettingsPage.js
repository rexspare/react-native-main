import React from "react";
import Box from "components/Box";
import { styles } from '../styles'
import { Layout } from "@ui-kitten/components";
import Header from "components/Header";
import SafeAreaView from "components/SafeAreaView";
import { ScrollView } from "react-native-gesture-handler";
import SettingsAboutUs from "./SettingsAboutUs";
import TermsOfService from "./TermsOfService";
import PrivacyPolicy from "./PrivacyPolicy";
import { typography } from 'styles/typography';

const dataMapping = {
    terms : {
        title:"Terms of Service", 
        content:TermsOfService
    },
    privacy : {
        title:"Privacy Policy", 
        content:PrivacyPolicy
    },
    about : {
        title:"About Us",
        content:SettingsAboutUs
    }
}
const SettingsPage = ({navigation,route}) =>{
    const page = route.params?.page;
    const PageContent = dataMapping[page].content
    return(
        <Box flex={1} as={Layout}>
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
                title={dataMapping?.[page].title}
                style={{ title: { ...typography['body/large – Bold']}}}
                divider
            />
            <Box style={styles.textContainer} as={ScrollView}>
                <PageContent />
            </Box>
           
            </Box>
        </Box>
    )
}

export default SettingsPage;