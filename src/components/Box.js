import styled from 'styled-components/native';
import {space, color, layout, flexbox} from 'styled-system';
import { typography } from 'styles/typography';

const Box = styled.View(
  {
    minWidth: 0,
    ...typography.textFontFamily
  },
  space,
  color,
  layout,
  flexbox,
);

export default Box;
