import Head from './head';
import Page from './page';
import { Access } from './Access';

export default function NewUser() {
  return (
    <Access>
      <div>
        <Head />
        <main>
          <Page />
        </main>
      </div>
    </Access>
  );
}
