import React from 'react';
import styled, {css} from 'styled-components/native';
import Button from 'components/Button';
import {Spinner} from '@ui-kitten/components';
import GradientButton from './GradientButton';

const LoginSpinnerView = styled.View`
  top: 1;
  right: 5;
  opacity: 0.72;
`;

const StyledSpinner = styled(Spinner)`
  ${({status}) =>
    status === 'basic'
      ? css`
          border-color: #1a2138;
        `
      : null}
`;

// const SubmitButton = ({
//   loading,
//   disabled,
//   children,
//   icon,
//   status,
//   gradient,
//   ...props
// }) => {
//   const ButtonComponent = gradient ? GradientButton : Button;
//   return (
//     <ButtonComponent
//       {...props}
//       status={status}
//       disabled={loading || disabled}
//       activeOpacity={1}
//       icon={
//         loading
//           ? style => (
//               <LoginSpinnerView style={style}>
//                 <StyledSpinner
//                   status={
//                     status === 'basic' ||
//                     (props?.appearance ?? 'filled') === 'ghost'
//                       ? status
//                       : 'control'
//                   }
//                   size="small"
//                 />
//               </LoginSpinnerView>
//             )
//           : icon
//       }>
//       {loading ? null : children}
//     </ButtonComponent>
//   );
// };

export default Button;
