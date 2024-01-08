import { useMemo, useState } from 'react';

export const useValidationState = () => {
    const [validationState, setValidationState] = useState({});

    const onValidationChange = ({validationMessage, isValid, fieldName}) => {
        setValidationState(prevState => ({
            ...prevState,
            [fieldName]: {validationMessage, isValid}
        }));
    }
    
    const isValid = useMemo(() => {
        const validationFields = Object.values(validationState);
        return Boolean(validationFields.length) && validationFields.every(({isValid}) => isValid);
    }, [validationState]);

    return {onValidationChange, validationState, isValid, setValidationState}
}