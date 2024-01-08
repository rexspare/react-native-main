import React from "react";
import styled from 'styled-components/native';
import FastImage from "react-native-fast-image";
import Box from "components/Box";
import { TouchableWithoutFeedback, View } from "react-native";
import Text from "components/Text";
import { ShadowContainer } from "components/Button";
import StyledLine from "components/StyledLine";
import { t } from "helpers/react";


const StyledBox = styled(Box)`
  justify-content: flex-start;
  align-items: center;
  height: 90;
  width: 100%;
  flex-direction: row;
  backgroundColor: #fff;
`;


const SelectCard = ({ displayName, address, onPress, isSelected, photos = [], imageRenderType = FastImage, ...item }) => {
    const [image] = photos;

    return (
        <TouchableWithoutFeedback
            shadow={false}
            status={isSelected ? 'primary' : 'basic'}
            size="large"
            shape="rounded"
            onPress={onPress}
        >
            <View>
                <ShadowContainer>
                    <StyledBox>
                        <Box style={{ width: 100, height: 72, justifyContent: 'center' }} mx="2">
                            {t(image, <Box
                                as={imageRenderType}
                                source={{ uri: image }}
                                style={{ width: 100, height: 72, }}
                                uri={image}
                            />)}
                        </Box>
                        <Text style={{ marginLeft: 7, color: isSelected ? "#55CAB2" : "#79909B", fontWeight: "bold" }}>{displayName || address}</Text>
                        <StyledLine borderColor={isSelected ? "#55CAB2" : "#79909B"} height={"50%"} top={"25%"} />
                    </StyledBox >
                </ShadowContainer>
            </View>
        </TouchableWithoutFeedback>
    )

}

export default SelectCard;