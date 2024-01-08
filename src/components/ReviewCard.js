import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import useTheme from 'hooks/useTheme';
import { Layout } from '@ui-kitten/components';
import Box from './Box';
import Text from './Text';
import TouchableText from './TouchableText';
import { typography } from 'styles/typography';

const dims = Dimensions.get('window');
const styles = StyleSheet.create({
    itemContainer: {
        alignSelf: "center",
        height: dims.height * 0.25,
        width: dims.width * 0.9,
        borderRadius: 10,
        backgroundColor: "#fff"
    }
});

const ReviewCard = ({ name, comment, onPress }) => {
    const theme = useTheme();
    return (
        <Box
            as={Layout}
            my={2}
            px={2}
            style={styles.itemContainer}
        >
            <Text style={typography["body/small – bold"]} mt={2} mx={3}>
                {name}
            </Text>
            <Text style={typography["body/x-small – regular"]} numberOfLines={5} mx={3} mb={2}>
                {comment}
            </Text>
            <TouchableText style={{...typography["body/small – bold"], marginLeft: 15}} onPress={onPress} color={theme['primary/50']}>
                Read all
            </TouchableText>
        </Box>
    );
};

export default ReviewCard;
