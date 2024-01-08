import { noop } from "lodash";
import { useCallback } from "react";
import { useFormError } from "./useFormError";

export const useSafeSubmit = (executeMutation, getFields, getIsValid = () => false, onIsValid, deps = [executeMutation], validateFields = noop, scrollView) => {
  const {error, setError} = useFormError({scrollView})
    const safeSubmit = useCallback(
      async form => {
        const {isValid: areFieldsValid = true} = validateFields(form) || {}
        if (!areFieldsValid) return null
        setError(null);
        const res = await executeMutation(getFields(form));
        const isValid = getIsValid(res);
        if (isValid) {
          onIsValid(res);
        } else {
          const error = (res.error.message || '').replace(/\[(Network Error|GraphQL)\]\s*/g, '')
          setError(error)
        }
      },
      [...deps, setError]
    )

    return { error, safeSubmit, setError }
  }
  