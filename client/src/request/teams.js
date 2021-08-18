export async function getTeam(teamId) {
  return fetch(`/api/teams/${teamId}`).then((res) => res.json());
}

export async function getTeamNameWithId(teamId) {
  return fetch(`/api/teams/${teamId}/name`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  }).then((res) => res.json());
}

export async function addMember(teamId, user) {
  const team = await getTeam(teamId);
  if (team.members.find((member) => String(member._id) === String(user._id)))
    throw new Error('Member already in team');
  return fetch(`/api/teams/${teamId}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id: user._id, name: user.name, isAdmin: 0 }),
  });
}

export async function removeMember(teamId, userId) {
  return fetch(`/api/teams/${teamId}/members/${userId}`, {
    method: 'DELETE',
  });
}
export async function toggleAdmin(teamId, userId) {
  return fetch(`/api/teams/${teamId}/members/${userId}/admin`, {
    method: 'PATCH',
  });
}
export async function createTeam(team, user) {
  const { _id: teamId } = await fetch('/api/teams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(team),
  }).then((res) => res.json());
  await addMember(teamId, user);
  return toggleAdmin(teamId, user._id);
}

export async function editTeam(data, teamId) {
  return fetch(`/api/teams/${teamId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function deleteTeam(teamId) {
  return fetch(`/api/teams/${teamId}`, {
    method: 'DELETE',
  });
}

export async function createTaskForTeam(teamId, task) {
  return fetch(`/api/teams/${teamId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
}

export async function editTaskForTeam(teamId, taskId, data) {
  return fetch(`/api/teams/${teamId}/tasks/${taskId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
export async function deleteTaskForTeam(teamId, taskId) {
  return fetch(`/api/teams/${teamId}/tasks/${taskId}`, {
    method: 'DELETE',
  });
}
