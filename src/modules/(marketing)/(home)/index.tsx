import Head from './head';
import Layout from '../layout';
import Page from './page';

export default function Home() {
  return (
    <div>
      <Head />
      <Layout>
        <Page />
      </Layout>
    </div>
  );
}
