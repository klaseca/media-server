import { networkInterfaces } from 'node:os';
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

export const makeUrl = (protocol, address, port) => {
  return `${protocol}://${
    ['::', undefined].includes(address) ? 'localhost' : address
  }:${port}`;
};

export const getNetworkAddresses = () => {
  return Object.values(networkInterfaces())
    .flat()
    .reduce((addresses, { family, address, internal }) => {
      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        addresses.push(address);
      }

      return addresses;
    }, []);
};
