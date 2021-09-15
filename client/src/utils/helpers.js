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

export const createMenuItems = (isDir, store, link) => {
  const copyToClipboard = async () => {
    try {
      await copy(`http://${document.location.hostname}:3232/stream/${link}`);
    } catch (error) {
      throw error;
    }
  };

  return isDir
    ? [
        {
          key: 'dz',
          name: 'Download zip',
          as: 'a',
          href: store.downloadLink(link, 'zip'),
        },
      ]
    : [
        {
          key: 'sl',
          name: 'Stream link',
          onClick: copyToClipboard,
        },
        {
          key: 'dl',
          name: 'Download',
          as: 'a',
          href: store.downloadLink(link),
        },
      ];
};
