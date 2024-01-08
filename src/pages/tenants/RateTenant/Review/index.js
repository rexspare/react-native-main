import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Text from 'components/Text';
import Features from 'components/Features';
import { styles } from "../styles";
import useTheme from 'hooks/useTheme';
import { getFormatedReview } from "../schema";
import { t } from 'helpers/react';

const featureStyle = { row: styles.reviewRow, label: styles.reviewLabel, content: styles.reviewContent };

const Review = ({ setValue, watching, isEditable = true, containerProps }) => {
    const theme = useTheme();
    const review = getFormatedReview(watching);
    return (
        <Box as={ScrollView} flex={1} px="2" mx={3} {...containerProps}>
            {t(isEditable, <Text style={styles.headingText} mt="3" category="h3" >{`review & submit`}</Text>)}
            {review.map((item) => (
                <>
                    <Box py="3" flexDirection="row" justifyContent="space-between">
                        <Text style={styles.headingText} mt="3" category="h3" >{item?.heading}</Text>
                        {t(isEditable, <Box as={TouchableOpacity} onPress={() => setValue('step', item?.step)}>
                            <Text mt="3" category="h4" color={theme['color-primary-gradient-1']}>EDIT</Text>
                        </Box>)}
                    </Box>
                    <Divider />
                    <Features styles={featureStyle} theme={theme} labelProps={{ numberOfLines: 2 }} features={item?.reviews} />
                </>
            ))}
        </Box>
    )
};

export default Review;