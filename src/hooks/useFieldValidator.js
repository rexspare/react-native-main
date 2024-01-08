import { useEffect, useState } from 'react';

export const useFieldValidator = (validators = [], { onValidationChange, fieldName }) => {
    const [error, setError] = useState('');

    const handleValidation = (e) => {
        const isValid = validators.every(validator => {
            const { isValid, validationMessage } = validator(e.nativeEvent.text);
            if (!isValid) setError(validationMessage)
            return isValid
        });
        if (isValid && error) setError(null)
    }

    useEffect(() => {
        if (!onValidationChange || !fieldName) return
        onValidationChange({
            fieldName,
            isValid: !error,
            validationMessage: error
        });
    }, [error])

    return { handleValidation, error }
}

