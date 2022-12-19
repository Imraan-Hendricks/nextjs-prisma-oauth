import Router from 'next/router';
import { FC, useEffect } from 'react';

interface RedirectProps {
  back?: boolean;
  to?: string;
}

export const Redirect: FC<RedirectProps> = ({ back, to }) => {
  useEffect(() => {
    if (back) return Router.back();
    if (to) Router.push(to);
  }, [back, to]);
  return null;
};
