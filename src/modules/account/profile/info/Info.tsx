import { clsx } from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { UpdateForm } from '../form/useUpdateUserBySID';
import { useSession } from '../../../../context/Session';

interface InfoProps {
  setUpdateForm: Dispatch<SetStateAction<UpdateForm>>;
}

export function Info({ setUpdateForm }: InfoProps) {
  const {
    session: { user },
  } = useSession();

  return (
    <div className='px-5 py-12'>
      <div className='container mx-auto grid gap-8'>
        <h1 className='text-h6'>Proflie</h1>
        <hr />
        <ul className='grid md:grid-cols-2 gap-4'>
          {(
            [
              {
                name: 'username',
                label: 'Username',
                value: user?.username,
                editable: true,
              },
              {
                name: 'contactNumber',
                label: 'Contact Number',
                value: user?.contactNumber || 'undefined',
                editable: true,
              },
              {
                name: 'firstName',
                label: 'First Name',
                value: user?.firstName,
                editable: true,
              },
              {
                name: 'lastName',
                label: 'Last Name',
                value: user?.lastName,
                editable: true,
              },
              {
                name: undefined,
                label: 'Email',
                value: user?.email,
                editable: false,
              },
              {
                name: undefined,
                label: 'Role',
                value: user?.role,
                editable: false,
              },
              {
                name: undefined,
                label: 'Created At',
                value: user?.createdAt.toString(),
                editable: false,
              },
              {
                name: undefined,
                label: 'Updated At',
                value: user?.updatedAt.toString(),
                editable: false,
              },
            ] as const
          ).map(({ name, label, value, editable }) => (
            <li
              key={label}
              onClick={() => setUpdateForm(name)}
              className={clsx(
                'group grid gap-2 p-5 hover:bg-gray-50 rounded-md',
                editable && 'cursor-pointer'
              )}>
              <div className='flex justify-between'>
                <span
                  className={clsx(
                    'text-body1-bold',
                    editable && 'group-hover:text-blue-600'
                  )}>
                  {label}:
                </span>
                {editable && (
                  <PencilSquareIcon className='w-4 h-4 text-gray-500 group-hover:text-blue-600' />
                )}
              </div>
              <span
                className={clsx(
                  'text-body1 text-gray-500',
                  editable && 'group-hover:text-gray-700'
                )}>
                {value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
