
export function displayTeamMembers(members, container) {
    container.innerHTML = '';

    if (!members || members.length === 0) {
        return;
    }

    members.forEach(member => {
        const card = document.createElement('article');
        card.className = 'profile-card';

        const name = document.createElement('h2');
        name.className = 'member-name';
        name.textContent = member.name || '';

        const role = document.createElement('p');
        role.className = 'member-role';
        role.textContent = member.role || '';

        const description = document.createElement('p');
        description.className = 'member-bio';
        description.textContent = member.description || '';

        card.appendChild(name);
        card.appendChild(role);
        card.appendChild(description);

        container.appendChild(card);
    });
}
