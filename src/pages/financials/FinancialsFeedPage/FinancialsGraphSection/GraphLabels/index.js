// import Text from 'components/Text'
import { t } from 'helpers/react'
import React from 'react'
import { Text } from 'react-native-svg'

const GraphLabels = ({ x, y, bandwidth, data, formatVal }) => {
    return (
        data.map(({ value }, index) => t(value, (
            <Text
                key={index}
                x={x(index) + (bandwidth / 2)}
                y={y(value) - 7}
                fontSize={14}
                fill={'black'}
                textAnchor={'middle'}
            >
                {value && formatVal(value)}
            </Text>
        )))
    )
}




export default GraphLabels