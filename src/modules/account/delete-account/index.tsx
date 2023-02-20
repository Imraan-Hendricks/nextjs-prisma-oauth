import AccountLayout from '../layout';
import Page from './page';
import { Access } from './Access';

export default function DeleteAccount() {
  return (
    <Access>
      <div>
        <AccountLayout>
          <Page />
        </AccountLayout>
      </div>
    </Access>
  );
}
