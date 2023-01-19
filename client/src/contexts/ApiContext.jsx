import { useLazyRef } from 'hooks/useLazyRef';
import { Api } from 'api/Api';
import { createNamedContext } from 'utils/createNamedContext/createNamedContext';
import { useConfig } from './ConfigContext';

export const { ApiContext, useApi } = createNamedContext({ name: 'Api' });

export const ApiProvider = ({ children }) => {
  const config = useConfig();

  const api = useLazyRef(() => new Api(config.apiUrl)).current;

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
