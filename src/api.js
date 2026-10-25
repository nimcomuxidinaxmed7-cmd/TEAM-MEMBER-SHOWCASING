
const API_URL = 'https://team-member-showcasing.onrender.com/teamMembers';

// Get all team members
export async function getTeamMembers() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Failed to get team members');
    }

    return await response.json();
}

// Get one team member
export async function getTeamMember(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error('Failed to get team member');
    }

    return await response.json();
}

// Add a new team member
export async function addTeamMember(member) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
    });

    if (!response.ok) {
        throw new Error('Failed to add team member');
    }

    return await response.json();
}

// Replace a team member's information
export async function updateTeamMember(id, member) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(member)
    });

    if (!response.ok) {
        throw new Error('Failed to update team member');
    }

    return await response.json();
}

// Update only some information
export async function patchTeamMember(id, changes) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(changes)
    });

    if (!response.ok) {
        throw new Error('Failed to edit team member');
    }

    return await response.json();
}

// Delete a team member
export async function deleteTeamMember(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Failed to delete team member');
    }

    return true;
}
