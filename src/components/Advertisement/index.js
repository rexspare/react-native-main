import React, { useState } from'react'
import Text from 'components/Text';
import { Image,TouchableOpacity  } from 'react-native';
import Box from 'components/Box';
import CloseIcon from 'img/icons/close-icon.svg'
import {styles} from './styles'

const Advertisement = ({title, content, image,hide}) => {
  const [close, setClose] = useState(hide)
  return (
    <Box px={`5%`} style={styles.adContainer}>
      {
        !close && (
          <Box flexDirection="row">
            <Box width="25%">
              <Image 
                style={styles.adImage} 
                source={image}
              />
            </Box>
            <Box width="60%" flexDirection="column" mx={20}>
              <Text style={styles.adTitle}>{title}</Text>
              <Text style={styles.adContent}>{content}</Text>
            </Box>
            <Box width="15%">
              <TouchableOpacity activeOpacity = {.5} onPress={()=>setClose(true)}>
                <CloseIcon style={styles.adCloseIcon} height="13px" width="13px"/>
              </TouchableOpacity> 
            </Box>
          </Box>
        )
      }
    </Box>
  )
}

export default Advertisement;