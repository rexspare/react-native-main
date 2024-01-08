import React from 'react';
import Box from './Box';

const Form = ({children, onSubmit, loading, ...props}) => {
  const inputRefs = React.useRef([]);

  const renderChildren = React.useCallback(() => {
    const helper = (childs, isLast = false, recursiveIndex = 0) => {
      const count = React.Children.count(childs);
      return React.Children.map(childs, (child, index) => {
        const childIsLast = isLast && index === count - 1;
        if (!child) {
          return child;
        }
        if (child?.props?.children) {
          return React.cloneElement(child, {
            children: helper(child.props.children, childIsLast, index),
          });
        }
        if (
          child?.type?.ignoreForm ||
          (child?.type?.name !== 'TextInput' &&
            child?.type?.styledComponentName !== 'Input' &&
            child?.type?.isInput !== true)
        ) {
          return child;
        }

        if (!(child?.props?.editable ?? true)) {
          return React.cloneElement(child, {
            ...child.props,
            disabled: loading || child.props.disabled,
          });
        }

        // const realIndex = index + recursiveIndex;
        let refIndex;
        const isMultiline = !!child?.props?.multiline;
        return React.cloneElement(child, {
          returnKeyType: isMultiline ? null : childIsLast ? 'done' : 'next',
          blurOnSubmit: childIsLast ? true : false,
          ...child.props,
          // disabled: loading || child.props.disabled,
          onSubmitEditing: isMultiline
            ? null
            : (...args) => {
                if (child.props.onSubmitEditing) {
                  child.props.onSubmitEditing(...args);
                }
                if (inputRefs.current[refIndex + 1]) {
                  inputRefs.current[refIndex + 1].focus();
                } else if (childIsLast && onSubmit) {
                  onSubmit();
                }
              },
          ref: node => {
            if (refIndex !== undefined) {
              inputRefs.current[refIndex] = node;
            } else {
              refIndex = inputRefs.current.length;
              inputRefs.current[refIndex] = node;
            }
            // Call the original ref, if any
            const {ref} = child;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          },
        });
      });
    };

    inputRefs.current = [];

    return helper(children, true);
  }, [children, loading, onSubmit]);

  return (
    <Box pointerEvents={loading ? 'none' : null}>
      {React.useMemo(() => renderChildren(), [renderChildren])}
    </Box>
  );
};

export default React.memo(Form);
