import { CustomHead } from '@/components/CustomHead';
import { Form } from './form/Form';

export default function Page() {
  return (
    <>
      <CustomHead title='New User' />
      <section>
        <Form />
      </section>
    </>
  );
}
