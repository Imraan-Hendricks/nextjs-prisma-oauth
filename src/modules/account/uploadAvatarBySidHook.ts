import { ChangeEvent, MouseEvent, useState } from 'react';
import { resizeImage } from '@/utils/image-utils';
import { uploadAvatarBySidAdapter } from '@/api/users/avatars/upload/sid/sid-adapter';
import { useMutation } from '@tanstack/react-query';
import { useUpdateSession } from '@/hooks/UpdateSessionHook';

export function useUploadAvatarBySid() {
  const { updateSession } = useUpdateSession();

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>();

  async function handleFileOnChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) return;
    try {
      const file = files[0];
      const options = { aspectRatio: '1:1', height: 400, quality: 0.92 };
      const { result } = await resizeImage(file, options);
      setAvatar(result.file);
      setPreview(result.base64);
    } catch (error: any) {
      alert(error.message);
    }
  }

  function refreshFileOnClick(e: MouseEvent<HTMLInputElement>) {
    e.currentTarget.value = '';
  }

  const { isLoading, mutate } = useMutation(
    uploadAvatarBySidAdapter.put.mutate,
    {
      onError: (error: any) => alert(error.message),
      onSuccess: async () => {
        setPreview(undefined);
        setAvatar(null);
        await updateSession();
      },
    }
  );

  function onCancellation() {
    setPreview(undefined);
    setAvatar(null);
  }

  function onConfirmation() {
    if (!avatar) return;
    const formData = new FormData();
    formData.append('avatar', avatar);
    mutate(formData);
  }

  return {
    handleFileOnChange,
    isLoading,
    preview,
    refreshFileOnClick,
    onCancellation,
    onConfirmation,
  };
}
