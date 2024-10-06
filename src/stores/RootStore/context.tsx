import * as React from 'react';

import { RootStore } from './RootStore';

type RootStoreContextValue = RootStore;

const RootStoreContext = React.createContext<RootStoreContextValue | null>(null);

export const RootStoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const store = new RootStore();

  return <RootStoreContext.Provider value={store}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = () => {
  const context = React.useContext(RootStoreContext);

  if (context === null) {
    throw new Error('context is null');
  }

  return context;
};
