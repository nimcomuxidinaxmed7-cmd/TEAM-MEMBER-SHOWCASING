import { expect } from 'chai';
import {
    getTeamMembers,
    getTeamMember,
    addTeamMember,
    updateTeamMember,
    patchTeamMember,
    deleteTeamMember
} from '../src/api.js';

describe('Team Member API', function () {
    let originalFetch;

    beforeEach(function () {
        originalFetch = globalThis.fetch;
    });

    afterEach(function () {
        globalThis.fetch = originalFetch;
    });

    function mockResponse(data, ok = true) {
        return {
            ok,
            json: async () => data
        };
    }

    it('gets all team members', async function () {
        const members = [{ id: 1, name: 'Nacima' }];
        globalThis.fetch = async () => mockResponse(members);

        expect(await getTeamMembers()).to.deep.equal(members);
    });

    it('gets one team member', async function () {
        const member = { id: 1, name: 'Nacima' };
        globalThis.fetch = async () => mockResponse(member);

        expect(await getTeamMember(1)).to.deep.equal(member);
    });

    it('adds a team member using POST', async function () {
        const member = { name: 'Leo', role: 'Developer' };
        let request;

        globalThis.fetch = async (url, options) => {
            request = options;
            return mockResponse({ id: 4, ...member });
        };

        const result = await addTeamMember(member);

        expect(request.method).to.equal('POST');
        expect(JSON.parse(request.body)).to.deep.equal(member);
        expect(result.name).to.equal('Leo');
    });

    it('updates a team member using PUT', async function () {
        const member = { name: 'Nacima', role: 'Developer' };
        let request;

        globalThis.fetch = async (url, options) => {
            request = options;
            return mockResponse(member);
        };

        await updateTeamMember(1, member);

        expect(request.method).to.equal('PUT');
        expect(JSON.parse(request.body)).to.deep.equal(member);
    });

    it('patches a team member using PATCH', async function () {
        const changes = { role: 'Designer' };
        let request;

        globalThis.fetch = async (url, options) => {
            request = options;
            return mockResponse(changes);
        };

        await patchTeamMember(1, changes);

        expect(request.method).to.equal('PATCH');
        expect(JSON.parse(request.body)).to.deep.equal(changes);
    });

    it('deletes a team member using DELETE', async function () {
        let request;

        globalThis.fetch = async (url, options) => {
            request = options;
            return { ok: true };
        };

        expect(await deleteTeamMember(1)).to.equal(true);
        expect(request.method).to.equal('DELETE');
    });

    it('throws an error when getting all members fails', async function () {
        globalThis.fetch = async () => mockResponse({}, false);

        try {
            await getTeamMembers();
            expect.fail('Expected an error');
        } catch (error) {
            expect(error.message).to.equal('Failed to get team members');
        }
    });

    it('throws an error when getting one member fails', async function () {
        globalThis.fetch = async () => mockResponse({}, false);

        try {
            await getTeamMember(1);
            expect.fail('Expected an error');
        } catch (error) {
            expect(error.message).to.equal('Failed to get team member');
        }
    });

    it('throws an error when adding a member fails', async function () {
        globalThis.fetch = async () => mockResponse({}, false);

        try {
            await addTeamMember({ name: 'Leo' });
            expect.fail('Expected an error');
        } catch (error) {
            expect(error.message).to.equal('Failed to add team member');
        }
    });

    it('throws an error when updating a member fails', async function () {
        globalThis.fetch = async () => mockResponse({}, false);

        try {
            await updateTeamMember(1, {});
            expect.fail('Expected an error');
        } catch (error) {
            expect(error.message).to.equal('Failed to update team member');
        }
    });

    it('throws an error when patching a member fails', async function () {
        globalThis.fetch = async () => mockResponse({}, false);

        try {
            await patchTeamMember(1, {});
            expect.fail('Expected an error');
        } catch (error) {
            expect(error.message).to.equal('Failed to edit team member');
        }
    });

    it('throws an error when deleting a member fails', async function () {
        globalThis.fetch = async () => ({ ok: false });

        try {
            await deleteTeamMember(1);
            expect.fail('Expected an error');
        } catch (error) {
            expect(error.message).to.equal('Failed to delete team member');
        }
    });
});
