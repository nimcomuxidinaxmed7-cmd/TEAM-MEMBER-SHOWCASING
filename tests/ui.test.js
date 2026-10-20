
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { displayTeamMembers } from '../src/ui.js';

describe('Team Member UI', function () {
    let dom;
    let container;

    beforeEach(function () {
        dom = new JSDOM('<div id="team-container"></div>');
        container = dom.window.document.querySelector('#team-container');

        globalThis.document = dom.window.document;
    });

    afterEach(function () {
        delete globalThis.document;
        dom.window.close();
    });

    it('should display team members', function () {
        const members = [
            {
                id: '1',
                name: 'Nacima',
                role: 'Frontend Developer',
                description: 'Builds websites'
            }
        ];

        displayTeamMembers(members, container);

        expect(container.textContent).to.include('Nacima');
        expect(container.textContent).to.include('Frontend Developer');
    });

    it('should display all members', function () {
        const members = [
            {
                id: '1',
                name: 'Nacima',
                role: 'Frontend Developer',
                description: 'Builds websites'
            },
            {
                id: '2',
                name: 'Leo',
                role: 'Web Designer',
                description: 'Designs websites'
            }
        ];

        displayTeamMembers(members, container);

        expect(container.textContent).to.include('Nacima');
        expect(container.textContent).to.include('Leo');
    });

    it('should handle an empty team', function () {
        displayTeamMembers([], container);

        expect(container.children.length).to.equal(0);
    });
});
