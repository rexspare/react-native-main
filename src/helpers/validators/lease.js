export const securityDepositValidator = (deposit, rentAmount) => {
    const isValid =  parseFloat(deposit) <= parseFloat(rentAmount);
    return {isValid, validationMessage: !isValid && "Security Deposit cannot be greater than rent."  }
} 

export const rentValidator = (amount, unitRent) => {
    const isValid =  !amount || !unitRent || (parseInt(amount) == unitRent);
    return {isValid, validationMessage: !isValid && `Rent Amount must match unit's rent ($${unitRent}). `  }
}