/* eslint-disable camelcase */
import UserState from './UserState';

describe('UserState', () => {
  describe('Adding users', () => {
    it('should return one extra user when adding a NEW user', () => {
      const users = new UserState();
      const currentUsersTotal = users.selectedUsers.length;

      users.add({name: 'John Davis'});

      expect(users.selectedUsers.length).toEqual(currentUsersTotal + 1);
    });
  });
});
