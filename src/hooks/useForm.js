import { validateRequiredFields } from "helpers/validators";
import { useCallback, useEffect, useState } from "react";
import { useFormError } from "./useFormError";
import { useValidationState } from "./useValidationState";

export const useForm = ({ initialValues, onSubmit, requiredFields, validateOnSubmit = true, scrollViewRef } = {}) => {
    const [form, setForm] = useState({});
    const { error, setError } = useFormError({ scrollView: scrollViewRef })

    const { isValid = true, onValidationChange, validationState } = useValidationState();

    const setValue = (field, value) => setForm({ ...form, [field]: value });

    const _validateRequiredFields = () => validateRequiredFields(form, requiredFields)

    useEffect(() => {
        if (!initialValues) return
        setForm(initialValues)
    }, []);

    const handleSubmit = useCallback(() => {
        if (validateOnSubmit && !isValid) return setError("Please fill fields correctly")
        if (requiredFields && !_validateRequiredFields()) return setError("Please fill in all required fields")
        onSubmit(form)
    }, [form, isValid, validationState, setError])

    return {
        setValue,
        form,
        setForm,
        error,
        isValid,
        onValidationChange,
        setError,
        handleSubmit,
        validationState,
        validateRequiredFields: _validateRequiredFields
    }
}