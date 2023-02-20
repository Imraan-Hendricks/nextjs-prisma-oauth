import Page from './page';
import { Access } from './Access';

export default function NewUser() {
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
