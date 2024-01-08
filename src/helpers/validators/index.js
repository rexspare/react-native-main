export const validateRequiredFields = (values = {}, requiredFields = []) => {
    return requiredFields.every(field => values[field] != null  && values[field] != undefined && values[field] != "")
}

export const handleRegexValidation = (regex, value)=>new RegExp(regex).test(String(value));

export const numericValidator = (value) => {
    const isValid = handleRegexValidation(/^[0-9]*$/, value)
    return {isValid, validationMessage: !isValid && "Only accepts characters 0-9."}
} 
