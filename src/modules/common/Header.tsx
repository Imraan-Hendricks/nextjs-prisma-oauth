import { Navbar } from './Navbar';

interface HeaderProps {
  hideLinks?: boolean;
}

export function Header({ hideLinks }: HeaderProps) {
  return <Navbar hideLinks={hideLinks} />;
}
