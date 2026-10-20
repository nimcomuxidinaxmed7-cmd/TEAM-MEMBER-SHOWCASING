
export function validateTeamMember(member) {
    if (!member.name || !member.name.trim()) {
        return false;
    }

    if (!member.role || !member.role.trim()) {
        return false;
    }

    return true;
}

export function createTeamMember(name, role, description, image) {
    const member = {
        name: name.trim(),
        role: role.trim(),
        description: description.trim(),
        image: image.trim()
    };

    if (!validateTeamMember(member)) {
        throw new Error('Name and role are required');
    }

    return member;
}

export function findTeamMember(members, id) {
    return members.find(member => String(member.id) === String(id));
}

export function searchTeamMembers(members, searchText) {
    const search = searchText.toLowerCase().trim();

    return members.filter(member =>
        member.name.toLowerCase().includes(search) ||
        member.role.toLowerCase().includes(search)
    );
}

export function getTeamMemberCount(members) {
    return members.length;
}
