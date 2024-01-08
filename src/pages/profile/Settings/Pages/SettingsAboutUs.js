import React from "react";
import Box from "components/Box";
import Text from "components/Text";
import { styles } from '../styles'

const SettingsAboutUs = () =>{
    return(
            <Box style={styles.aboutTextContainer}>
                <Text style={styles.titleText}>About Us</Text>
                <Text style={styles.titleText}>Empowered property performance</Text>
                <Text style={styles.paragraphText}>TIGRA delivers the ultimate real estate management platform built to increase efficiency, streamline operations, minimize costs and drive profits. All in one easy to use powerful tool.</Text>
                <Text style={styles.titleText}>Imagine a digital utopia  where everything just works</Text>
                <Text style={styles.paragraphText}>Your daily property management operations, supply chains, financials, maintenance, legal services, and business partners work in unison. You can track the progress of all work in real-time, with total clarity. Function and communication are as laser-sharp as the eye of a tiger.</Text>
                <Text style={styles.titleText}>Easy and efficient property management</Text>
                <Text style={[styles.paragraphText, {marginBottom: 30}]}>TIGRA is the first and only holistic, experience-based property management platform, created and founded by an owner and manager, for owners and managers. Our goal? Improving property performance through clear and easy communication. Seamless success. Every single time.</Text>
            </Box>
    )
}

export default SettingsAboutUs