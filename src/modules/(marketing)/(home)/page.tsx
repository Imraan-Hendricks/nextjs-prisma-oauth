import { CustomHead } from '@/components/CustomHead';
import { Hero } from './hero/Hero';

export default function Page() {
  return (
    <>
      <CustomHead title='Home' />
      <section>
        <Hero />
      </section>
    </>
  );
}
