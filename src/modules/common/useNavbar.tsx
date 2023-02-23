import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Page = '/' | '/blog' | '/support';

interface ContextProps {
  active: Page;
  setActive: Dispatch<SetStateAction<Page>>;
}

const NavbarContext = createContext<ContextProps | undefined>(undefined);

export const useNavbar = (active?: Page) => {
  const context = useContext(NavbarContext);
  if (!context)
    throw new Error('useNavbar must be inside a Provider with a value');

  const setActive = context.setActive;
  useEffect(() => {
    if (active) setActive(active);
  }, [active, setActive]);

  return context;
};

export const NavbarProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [active, setActive] = useState<Page>('/');

  return (
    <NavbarContext.Provider value={{ active, setActive }}>
      {children}
    </NavbarContext.Provider>
  );
};
