import unitlessNumbers from '../../modules/unitlessNumbers';

const normalizeValue = (property, value) => {
  if (!unitlessNumbers[property] && typeof value === 'number') {
    value = `${value}px`;
  }
  return value;
};

export default normalizeValue;
