import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled as ukStyled } from '@ui-kitten/components';
import { Image } from 'react-native';
import useTheme from 'hooks/useTheme';
import { SubSwitch, SwitchBackground } from 'components/MultiTextSwitch';
import Box from 'components/Box';

const styles = {
    container: {
        borderRadius: 12, justifyContent: "center", alignItems: "center", marginHorizontal: 7, maxHeight: 18, 
    },
    image : {
        height: 7, width: 7,
    }
}

const GraphSwitch = ({ isActive = true, themedStyle, onPress }) => {
    const theme = useTheme()
    const [activeIcon, inactiveIcon] = useMemo(() => [require("img/icons/graph.png"), require("img/icons/graph-grey.png")], [])
    return (
        <Box shape="circle" style={[{ ...themedStyle, backgroundColor: isActive ? theme["color-primary-500"] : themedStyle.backgroundColor, }, styles.container]} >
            <SwitchBackground style={{ backgroundColor: themedStyle.switchBackgroundColor , borderWidth: 1, borderColor: "red"}} />
            <SubSwitch  width={"100%"} as={TouchableOpacity} onPress={onPress}>
                <Image source={isActive ? activeIcon : inactiveIcon} {...styles.image}/>
            </SubSwitch>
        </Box>
    )
}
GraphSwitch.styledComponentName = 'TextSwitch'

export default ukStyled(GraphSwitch)