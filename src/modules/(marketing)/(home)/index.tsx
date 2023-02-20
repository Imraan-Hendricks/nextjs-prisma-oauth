import Layout from '../layout';
import Page from './page';
import { Access } from './Access';

export default function Home() {
  return (
    <Access>
      <div>
        <Layout>
          <Page />
        </Layout>
      </div>
    </Access>
  );
}
