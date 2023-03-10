import { Form } from './Form';
import { Preview } from './Preview';
import { useUploadAvatarBySID } from './UploadAvatarBySIDHook';

export function Avatar() {
  const {
    handleFileOnChange,
    isLoading,
    preview,
    refreshFileOnClick,
    onCancellation,
    onConfirmation,
  } = useUploadAvatarBySID();

  return (
    <div>
      <div className='mx-5'>
        <Form
          handleFileOnChange={handleFileOnChange}
          refreshFileOnClick={refreshFileOnClick}
        />
      </div>
      {preview && (
        <div className='fixed inset-0 flex justify-center items-center bg-black/70'>
          <Preview
            isLoading={isLoading}
            preview={preview}
            onCancellation={onCancellation}
            onConfirmation={onConfirmation}
          />
        </div>
      )}
    </div>
  );
}
