interface Delete {
  response: void;
}

const _delete = {
  mutate: async function () {
    const res = await fetch('/api/auth/signout', { method: 'DELETE' });
    if (!res.ok) throw await res.json();
  },
};

export interface SignoutAdapter {
  delete: Delete;
}

export const signoutAdapter = {
  delete: _delete,
};
