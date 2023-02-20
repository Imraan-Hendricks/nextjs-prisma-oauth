import { CustomHead } from '@/components/CustomHead';
import { Main } from './main/Main';
import { Prompt } from './prompt/Prompt';
import { useState } from 'react';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CustomHead title='Delete Account' />
      <section>
        <Main setIsOpen={setIsOpen} />
      </section>
      {isOpen && (
        <div className='fixed inset-0 h-screen w-full px-5 bg-black/70 flex justify-center items-center'>
          <Prompt setIsOpen={setIsOpen} />
        </div>
      )}
    </>
  );
}
