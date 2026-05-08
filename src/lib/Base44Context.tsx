import { createContext, useContext, useMemo } from 'react';

const Base44ProviderContext = createContext<any>(null);

export const Base44Provider = ({ children }: { children: React.ReactNode }) => {
  const value = useMemo(() => ({}), []);
  return <Base44ProviderContext.Provider value={value}>{children}</Base44ProviderContext.Provider>;
};

export const useBase44 = () => useContext(Base44ProviderContext);
