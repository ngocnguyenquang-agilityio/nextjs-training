/**
 * Convert value from input date to correct format dates
 * @param {string} value
 * @returns {string}
 */
export const convertDateValue = (value: string) => {
  return new Date(value).toISOString();
};
