import { useLazyRef } from 'hooks/useLazyRef';
import { getConfig } from 'config';
import { createNamedContext } from 'utils/createNamedContext/createNamedContext';

export const { ConfigContext, useConfig } = createNamedContext({ name: 'Config' });

export const ConfigProvider = ({ children }) => {
  const config = useLazyRef(getConfig).current;

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
