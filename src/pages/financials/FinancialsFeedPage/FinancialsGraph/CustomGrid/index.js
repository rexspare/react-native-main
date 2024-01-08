import React from "react";
import {G, Line, SvgXml, Svg, Polygon} from "react-native-svg";
import { colors } from "styles/theme";
import Box from "components/Box";
import { style } from "styled-system";


const CustomGrid = ({ x, months, gridOnPress, selectedLine }) => {

    const STROKEWIDTH = 2.5

    return(
        <G>
            {// Vertical grid
            months.map((_, index) => (
                (selectedLine==index? 
                    <Line 
                        key={index} 
                        y1={'0%'} y2={'100%'} x1={x(index)} x2={x(index)} 
                        stroke={colors['gray scale/5']} 
                        strokeWidth={25}
                        onPress={()=>gridOnPress(index)}
                        style={{zIndex: 10}}
                    /> 
                    : 
                    <Line 
                        key={index} 
                        y1={'0%'} y2={'100%'} x1={x(index)} x2={x(index)} 
                        stroke={colors['gray scale/5']} 
                        strokeWidth={STROKEWIDTH}
                        onPress={()=>gridOnPress(index)}
                    /> 
                )
            ))}
        </G>
    )
}

export default CustomGrid