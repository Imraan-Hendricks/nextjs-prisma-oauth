export const handlePromise = async <T>(promise: Promise<T>) => {
  try {
    const data = await promise;
    return [undefined, data] as const;
  } catch (error: any) {
    return [error, undefined as Awaited<T>] as const;
  }
};

export function isObject(value: any) {
  if (
    value &&
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  )
    return true;
  return false;
}
