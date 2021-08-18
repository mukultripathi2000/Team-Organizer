export async function createUserWithEmailAndPassword(email, password, name) {
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: email, password, name }),
  };
  return fetch('/api/register', data);
}

export async function loginInWithEmailAndPassword(email, password) {
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: email, password }),
  };
  return fetch('/api/login', data);
}

export async function logOut() {
  return fetch('/api/logout');
}

export async function getUser() {
  return fetch('/api/isAuthenticated').then((res) => res.json());
}

export async function getUserWithId(userId) {
  return fetch(`/api/users/${userId}`).then((res) => res.json());
}
