import Head from './head';
import Page from './page';
import { Access } from './Access';

export default function Signup() {
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
