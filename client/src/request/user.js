

export async function updateUser(userId, name) {
  console.log(await JSON.stringify({ name }));
  return fetch(`/api/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
}
