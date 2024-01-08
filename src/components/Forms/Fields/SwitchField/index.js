import React from "react";
import { colors } from "styles/theme";
import { Container } from "components/Forms/Tasks/TaskForm";
import { input_label_16 } from 'styles/reusable-classes';
import Box from "components/Box";
import Switch from "components/Switch";
import InputLabel from "components/InputLabel";
import { noop } from "lodash";

 const SwitchField = ({ label, labelStyle = input_label_16, onChange=noop, styles, checked, isRequired, ...props }) => {
    return (
      <Container width={"100%"} flexDirection={"row"} borderBottomWidth={0} justifyContent={"space-between"} alignItems={"center"} {...styles?.container} >
        <InputLabel labelStyle={labelStyle} label={label} isRequired={isRequired}  />
        <Box {...styles?.switchContainer}>
          <Switch
            containerStyle={{ height: 18 }}
            backgroundColorOn={colors['primary/50']}
            backgroundColorOff={colors['gray scale/30']}
            circleColorOff={'#fff'}
            circleColorOn={"#fff"}
            checked={checked}
            onChange={onChange}
            {...props}
          />
        </Box>
      </Container>
    )
  };

  export default SwitchField