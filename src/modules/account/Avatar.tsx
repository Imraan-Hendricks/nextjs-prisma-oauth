import { Form } from './Form';
import { Preview } from './Preview';
import { useUploadAvatarBySid } from './uploadAvatarBySidHook';

export function Avatar() {
  const {
    handleFileOnChange,
    isLoading,
    preview,
    refreshFileOnClick,
    onCancellation,
    onConfirmation,
  } = useUploadAvatarBySid();

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
