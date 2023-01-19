import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUpdateEffect } from 'hooks/useUpdateEffect';

const pathnameToBreadcrumbs = (pathname) => {
  const breadcrumbs = [{ path: '/', name: 'Main' }];

  if (pathname !== '/') {
    pathname.split('/').reduce((currPath, path) => {
      const newCurrPath = `${currPath}/${path}`;
      breadcrumbs.push({ path: newCurrPath, name: path });
      return newCurrPath;
    });
  }

  return breadcrumbs;
};

export const useBreadcrumb = () => {
  const { pathname } = useLocation();

  const [breadcrumbs, setBreadcrumbs] = useState(() =>
    pathnameToBreadcrumbs(pathname)
  );

  useUpdateEffect(() => {
    setBreadcrumbs(pathnameToBreadcrumbs(pathname));
  }, [pathname]);

  const isLastBreadcrumb = (breadcrumbIndex) =>
    breadcrumbIndex === breadcrumbs.length - 1;

  return { breadcrumbs, isLastBreadcrumb };
};
