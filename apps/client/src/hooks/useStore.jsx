import { createContext, useContext } from 'react';
import { Store } from 'store/store';

const StoreContext = createContext(new Store());

export const useStore = () => useContext(StoreContext);
