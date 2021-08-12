import { useLocation } from 'react-router-dom';

export const useBreadcrumb = () => {
  const { pathname } = useLocation();
  const paths = [{ path: '/', name: 'Main' }];

  if (pathname !== '/') {
    pathname.split('/').reduce((currPath, path) => {
      const newCurrPath = `${currPath}/${path}`;
      paths.push({ path: newCurrPath, name: path });
      return newCurrPath;
    });
  }

  const isLastPath = (pathIndex) => pathIndex === paths.length - 1;

  return { paths, isLastPath };
};
