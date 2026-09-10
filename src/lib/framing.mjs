export const framingRatio = (fieldWidthDeg, fieldHeightDeg, objectWidthDeg, objectHeightDeg) =>
  Math.max(objectWidthDeg / fieldWidthDeg, objectHeightDeg / fieldHeightDeg);

export const framingStatus = (ratio) => ratio > 1 ? 'outside' : ratio > .58 ? 'tight' : 'roomy';
