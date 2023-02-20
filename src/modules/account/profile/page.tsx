import { CustomHead } from '@/components/CustomHead';
import { Form } from './form/Form';
import { Info } from './info/Info';
import { UpdateForm } from './form/useUpdateUserBySID';
import { useClickAwayListener } from '../../../hooks/useClickAwayListener';
import { useRef, useState } from 'react';

export default function Page() {
  const [updateForm, setUpdateForm] = useState<UpdateForm>();

  const ref = useRef<HTMLDivElement | null>(null);
  useClickAwayListener(ref, () => setUpdateForm(undefined));

  return (
    <>
      <CustomHead title='Profile' />
      <section>
        <Info setUpdateForm={setUpdateForm} />
      </section>
      {updateForm && (
        <div ref={ref} className='fixed left-0 bottom-0 w-full bg-gray-50'>
          <Form updateForm={updateForm} setUpdateForm={setUpdateForm} />
        </div>
      )}
    </>
  );
}
