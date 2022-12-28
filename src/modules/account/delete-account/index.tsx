import AccountLayout from '../layout';
import Head from './head';
import Page from './page';
import { Access } from './Access';

export default function DeleteAccount() {
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
