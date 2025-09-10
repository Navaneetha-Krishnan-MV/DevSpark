

export const isRegistrationClosed = (): boolean => {
  const currentDate = new Date();
  const closingDate = new Date('2025-09-10T23:59:59');
  
  return currentDate >= closingDate;
};

export default isRegistrationClosed;
