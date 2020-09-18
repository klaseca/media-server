import { createContext, useContext } from 'react';
import store from 'store/store';

const storeCtx = createContext({ store });

export const useStores = () => useContext(storeCtx);
