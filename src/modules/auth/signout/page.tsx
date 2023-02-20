import { CustomHead } from '@/components/CustomHead';
import { Form } from './form/Form';

export default function Page() {
  return (
    <>
      <CustomHead title='Sign Out' />
      <section>
        <Form />
      </section>
    </>
  );
}
