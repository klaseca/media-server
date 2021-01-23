import copy from 'clipboard-copy';

export const createMenuItems = (isDir, store, link) => {
  const copyToClipboard = async () => {
    try {
      const parametr = `${store.paths.join('/')}/${link}`;
      const parametrEncode = encodeURIComponent(parametr);
      await copy(
        `http://${document.location.hostname}:3232/stream/${parametrEncode}`
      );
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
