import AccountLayout from '../layout';
import Head from './head';
import Page from './page';
import { Access } from './Access';

export default function Settings() {
  return (
    <Access>
      <div>
        <Head />
        <AccountLayout>
          <Page />
        </AccountLayout>
      </div>
    </Access>
  );
}
