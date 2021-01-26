export const parseParams = (params) => {
  const paramsDecode = decodeURIComponent(params);
  const paramsArray = paramsDecode.split('/');
  return [paramsArray[0], paramsArray.slice(1).join('/')];
};
