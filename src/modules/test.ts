let testIdPrefix = '';

export const setTestIDPrefix = (value: string) => {
  testIdPrefix = value;
};

export const getTestID = (testID?: string): string | undefined => {
  if (!testID) {
    return testID;
  }

  if (testIdPrefix) {
    return `${testIdPrefix}${testID}`;
  }

  return testID;
};
