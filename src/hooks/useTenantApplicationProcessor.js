import React from 'react';

const processData = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  const random = Math.round(Math.random() * 100);
  const randomStartDate = new Date(1960, 0, 1);
  const randomEndDate = new Date(2000, 0, 1);
  const randomDate = new Date(
    randomStartDate.getTime() +
      Math.random() * (randomEndDate.getTime() - randomStartDate.getTime()),
  );
  randomDate.setMilliseconds(0);
  randomDate.setSeconds(0);
  randomDate.setMinutes(0);
  randomDate.setHours(0);

  return {
    firstName: 'Prospective',
    lastName: `Tenant ${random}`,
    email: `prostenant${random}@gmail.com`,
    phone: `1234567${`0${random}`.substr(`${random}`.length - 1)}`,
    address: `Prospective Tenant Address ${random}`,
    // prevAddress: `Previous Prospective Tenant Address ${random}`,
    ssn: `8765432${`0${random}`.substr(`${random}`.length - 1)}`,
    driverLicense: `1234876${`0${random}`.substr(`${random}`.length - 1)}`,
    passport: `142536${`0${random}`.substr(`${random}`.length - 1)}`,
    emergencyContact: `Emergency Contact ${random}`,
    emergencyContactPhone: `8473625${`0${random}`.substr(
      `${random}`.length - 1,
    )}`,
    birthday: randomDate.toISOString().substr(0, 10),
    occupation: 'Who cares',
    unitNumber: 16,
    building: 'CJ 18 Corp',
    rentDay: 1,
    deposit: 0,
    leasePeriod: 90,
    rentAmount: 2500,
  };
};

export default function useTenantApplicationProcessor() {
  const [processing, setProcessing] = React.useState(false);
  const processFile = React.useCallback(file => {
    const process = async () => {
      const result = {data: null, error: null};
      setProcessing(true);
      try {
        const data = await processData(file);
        result.data = data;
      } catch (error) {
        result.error = error;
      }
      setProcessing(false);
      return result;
    };
    return process();
  }, []);

  return [processing, processFile];
}
