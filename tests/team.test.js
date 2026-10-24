import { expect } from 'chai';
import {
    validateTeamMember,
    createTeamMember,
    findTeamMember,
    searchTeamMembers,
    getTeamMemberCount
} from '../src/team.js';

describe('Team Member Functions', function () {
    const members = [
        { id: 1, name: 'Nacima', role: 'Frontend Developer', description: 'Builds interfaces', image: '' },
        { id: 2, name: 'Abdirizak', role: 'Data Analyst', description: 'Works with data', image: '' },
        { id: 3, name: 'Nasteha', role: 'UI/UX Designer', description: 'Designs experiences', image: '' }
    ];

    describe('validateTeamMember', function () {
        it('accepts a member with a name and role', function () {
            expect(validateTeamMember(members[0])).to.equal(true);
        });

        it('rejects a missing name', function () {
            expect(validateTeamMember({ name: '', role: 'Developer' })).to.equal(false);
        });

        it('rejects a missing role', function () {
            expect(validateTeamMember({ name: 'Nacima', role: ' ' })).to.equal(false);
        });
    });

    describe('createTeamMember', function () {
        it('creates a member and trims whitespace', function () {
            const member = createTeamMember(' Nacima ', ' Developer ', ' Builds websites ', ' image.jpg');

            expect(member.name).to.equal('Nacima');
            expect(member.role).to.equal('Developer');
            expect(member.description).to.equal('Builds websites');
            expect(member.image).to.equal('image.jpg');
        });

        it('throws an error when the name is empty', function () {
            expect(() => createTeamMember(' ', 'Developer', '', '')).to.throw('Name and role are required');
        });
    });

    describe('findTeamMember', function () {
        it('finds a member by ID', function () {
            expect(findTeamMember(members, 2).name).to.equal('Abdirizak');
        });

        it('returns undefined when the ID does not exist', function () {
            expect(findTeamMember(members, 99)).to.equal(undefined);
        });
    });

    describe('searchTeamMembers', function () {
        it('searches names without case sensitivity', function () {
            expect(searchTeamMembers(members, 'nacima')).to.have.lengthOf(1);
        });

        it('searches by role', function () {
            expect(searchTeamMembers(members, 'designer')[0].name).to.equal('Nasteha');
        });

        it('returns all members for an empty search', function () {
            expect(searchTeamMembers(members, '')).to.have.lengthOf(3);
        });
    });

    describe('getTeamMemberCount', function () {
        it('returns the number of members', function () {
            expect(getTeamMemberCount(members)).to.equal(3);
        });

        it('returns zero for an empty list', function () {
            expect(getTeamMemberCount([])).to.equal(0);
        });
    });
});
