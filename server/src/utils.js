import orderBy from 'just-order-by';

export const parseParams = (params) => {
  const paramsDecode = decodeURIComponent(params);

  const paramsArray = paramsDecode.split('/');

  return [paramsArray[0], paramsArray.slice(1).join('/')];
};

export const sortContents = (contents) =>
  orderBy(contents, [
    { property: 'isDir', order: 'desc' },
    { property: 'name', order: 'asc' },
  ]);
