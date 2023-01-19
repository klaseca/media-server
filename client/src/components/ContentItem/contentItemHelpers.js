import copy from 'clipboard-copy';

export const concatPaths = (currentPath, addedPath) => {
  if (currentPath === '/') {
    return `/${addedPath}`;
  }
  return `${currentPath}/${addedPath}`;
};

export const createLink = (currentPath, contentName) => {
  return encodeURIComponent(`${currentPath.slice(1)}/${contentName}`);
};

const copyToClipboard = async (url, link) => {
  try {
    await copy(`${url}/stream/${link}`);
  } catch (error) {
    throw error;
  }
};

const downloadLink = (url, name, ext = '') => `${url}/download/${ext}${name}`;

export const createMenuItems = (url, isDir, link) => {
  return isDir
    ? [
        {
          key: 'dz',
          name: 'Download zip',
          as: 'a',
          href: downloadLink(url, link, '/zip'),
        },
      ]
    : [
        {
          key: 'sl',
          name: 'Stream link',
          onClick: () => copyToClipboard(url, link),
        },
        {
          key: 'dl',
          name: 'Download',
          as: 'a',
          href: downloadLink(url, link),
        },
      ];
};
