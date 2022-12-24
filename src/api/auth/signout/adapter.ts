export const signout = async () => {
  const res = await fetch('/api/auth/signout', { method: 'DELETE' });
  if (!res.ok) throw await res.json();
};
