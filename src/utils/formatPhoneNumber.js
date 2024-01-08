function formatPhoneNumber(value, isInput) {
  if (!value) return value;
  const currentValue = value
    .split('+1')
    .join('')
    .replace(/[^\d]/g, '');
  const cvLength = currentValue.length;
  if (cvLength < 4) return currentValue;
  if (cvLength < 7)
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
  return `${!isInput ? '+1' : ''}(${currentValue.slice(
    0,
    3,
  )}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
}

export default formatPhoneNumber;
