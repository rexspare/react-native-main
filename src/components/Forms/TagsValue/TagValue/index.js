import Box from 'components/Box';
import Text from 'components/Text';
import { t } from 'helpers/react';
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native';
import { colors } from 'styles/theme';
import { typography } from 'styles/typography';
import { Icon } from '@ui-kitten/components';

const TagValue = ({ value, onDelete, textStyle = {}, ...props }) => {
    return (
        <Box
            p="8px"
            py="1"
            mr="2"
            mt={2}
            mb="2"
            flexDirection={"row"}
            borderColor={colors['primary/50']}
            backgroundColor={colors['primary/50']}
            borderRadius={8}
            {...props}>
            <Text color={"#fff"} style={[typography['body/medium – regular'], {textTransform: 'capitalize'}]} fontWeight={"400"}>
                {value}
            </Text>
            {t(onDelete, <Box as={TouchableWithoutFeedback} onPress={onDelete}>
                <Box ml={"10"} style={{justifyContent: 'center'}}>
                    <Icon width={8} height={8} style={{ alignSelf: 'center' }} pack={'pm'} name={"closeIconWhite"} />
                </Box>
            </Box>)}
        </Box>
    )
};

export default TagValue
