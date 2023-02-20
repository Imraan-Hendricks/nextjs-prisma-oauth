import Page from './page';
import { Access } from './Access';

export default function Signout() {
  return (
    <Access>
      <div>
        <main>
          <Page />
        </main>
      </div>
    </Access>
  );
}
