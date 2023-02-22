import Router from 'next/router';
import { FC, useEffect } from 'react';

interface RedirectProps {
  back?: boolean;
  to?: string;
  replace?: boolean;
}

export const Redirect: FC<RedirectProps> = ({ back, to, replace }) => {
  useEffect(() => {
    if (back) return Router.back();
    if (to) {
      if (replace) Router.replace(to);
      else Router.push(to);
    }
  }, [back, to, replace]);
  return null;
};
