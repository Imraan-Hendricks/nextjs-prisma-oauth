import Head from './head';
import Layout from '../layout';
import { Hero } from './Hero';

export default function Home() {
  return (
    <div>
      <Head />
      <Layout>
        <section>
          <Hero />
        </section>
      </Layout>
    </div>
  );
}
