import { createContext, useContext } from 'react';
import { Store } from 'store/store';

const storeCtx = createContext({ store: new Store() });

export const useStores = () => useContext(storeCtx);
