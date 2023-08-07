import { createContext, useContext, useState, useMemo } from 'react';

// Create the context
const VisibilityContext = createContext();

export const useVisibility = () => useContext(VisibilityContext);

export function VisibilityProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  // Use useMemo to memoize the value
  const contextValue = useMemo(() => ({ isVisible, setIsVisible }), [isVisible, setIsVisible]);

  return (
    <VisibilityContext.Provider value={contextValue}>
      {children}
    </VisibilityContext.Provider>
  );
}
