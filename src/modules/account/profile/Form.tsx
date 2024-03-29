import { Button } from '@/components/Button';
import { Dispatch, SetStateAction } from 'react';
import { TextField } from '@/components/TextField';
import { UpdateForm, useUpdateUserBySid } from './updateUserBySidHook';

interface FormProps {
  updateForm: UpdateForm;
  setUpdateForm: Dispatch<SetStateAction<UpdateForm>>;
}

export function Form({ updateForm, setUpdateForm }: FormProps) {
  const { fields, isLoading, onSubmit } = useUpdateUserBySid({
    updateForm,
    setUpdateForm,
  });

  return (
    <div className='w-full py-8 animate-[fade-in_600ms_ease]'>
      <form onSubmit={onSubmit} className='flex justify-center'>
        {fields.map((props) => (
          <TextField key={props.name} {...props} />
        ))}
        <Button className='ml-4' disabled={isLoading} loading={isLoading}>
          Update
        </Button>
      </form>
    </div>
  );
}
