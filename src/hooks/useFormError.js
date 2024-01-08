import { useCallback, useState } from "react";

const scrollOptions = {y: 0,animated: true};

export const useFormError = ({ scrollView }) => {
  const [error, _setError] = useState(null)
  const setError = useCallback((error) => {
    _setError(() => error)
    scrollView?.scrollTo(scrollOptions)
  }, [scrollView, _setError])

  return {error, setError}
}