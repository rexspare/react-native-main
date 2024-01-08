import styled from 'styled-components/native';
import {space, color, layout, flexbox, typography} from 'styled-system';
import {Text as UIText} from '@ui-kitten/components';
import {typography as styles} from 'styles/typography'

const Text = styled(UIText)(
  {
    minWidth: 0,
    ...styles.textFontFamily, ...styles.textFontSize
  },
  space,
  color,
  layout,
  flexbox,
  typography,
);

export default Text;
