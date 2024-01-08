import { Linking } from 'react-native';

export const formatAmount = (number = 0) => {
  const options = {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
  };

  if (number >= 1000) {
    options.maximumFractionDigits = 0;
  }

  return number.toLocaleString('en-US', options);
};

export const romanize = num => {
  if (isNaN(num)) return NaN;
  var digits = String(+num).split(''),
    key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
    ],
    roman = '',
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return Array(+digits.join('') + 1).join('M') + roman;
};

export const CallContact = tel => {
  if (tel) {
    const num = `${tel.split('+1').join('')}`.replace(/[^0-9.]+/g, '');
    return Linking.openURL(`tel:${'+1 ' + num}`);
  }
};

export const transformNumber = value => {
  if (!!value) {
    return `${value}`.replace(/[^0-9.]+/g, '');
  }
};
