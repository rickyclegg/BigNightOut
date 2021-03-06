/* eslint-disable max-statements */

describe('UserState', () => {
  let usersData;

  beforeAll(() => {
    fixture.setBase('app/data');

    usersData = fixture.load('users.json');
  });

  describe('Adding users', () => {
    it('should return one extra user when adding a NEW user', () => {
      const users = new timeout.UserState();
      const currentUsersTotal = users.selectedUsers.length;

      users.add(usersData[0]);

      expect(users.selectedUsers.length).toEqual(currentUsersTotal + 1);
    });

    it('should return a new version of the state', () => {
      const users = new timeout.UserState();
      const currentUsers = users.selectedUsers;

      users.add(usersData[0]);

      expect(users.selectedUsers).not.toBe(currentUsers);
    });

    it('should return an array containing no duplicates', () => {
      const users = new timeout.UserState();
      const currentUsersTotal = users.selectedUsers.length;

      users.add(usersData[0]);
      users.add(usersData[0]);

      expect(users.selectedUsers.length).toEqual(currentUsersTotal + 1);
    });
  });

  describe('Removing users', () => {
    it('should return one less users when removing a user', () => {
      const users = new timeout.UserState();
      let currentUsersTotal = 0;

      users.add(usersData[0]);
      users.add(usersData[1]);
      users.add(usersData[2]);

      currentUsersTotal = users.selectedUsers.length;

      users.remove(usersData[1]);

      expect(users.selectedUsers.length).toEqual(currentUsersTotal - 1);
    });

    it('should return one less users when removing a user by name', () => {
      const users = new timeout.UserState();

      users.add(usersData[0]);
      users.add(usersData[1]);
      users.add(usersData[2]);

      users.remove('Gary Jones');

      expect(users.selectedUsers[0].name).toEqual(usersData[0].name);
      expect(users.selectedUsers[1].name).toEqual(usersData[2].name);
    });

    it('should return the same number of user when removing the same user twice', () => {
      const users = new timeout.UserState();

      users.add(usersData[0]);
      users.add(usersData[1]);
      users.add(usersData[2]);

      users.remove('Gary Jones');
      users.remove('Gary Jones');

      expect(users.selectedUsers.length).toEqual(2);
      expect(users.selectedUsers[0].name).toEqual(usersData[0].name);
      expect(users.selectedUsers[1].name).toEqual(usersData[2].name);
    });

    it('should return no users if all are removed', () => {
      const users = new timeout.UserState();

      users.add(usersData[0]);
      users.add(usersData[1]);
      users.add(usersData[2]);

      users.remove(usersData[0]);
      users.remove(usersData[1]);
      users.remove(usersData[2]);

      expect(users.selectedUsers.length).toEqual(0);
    });
  });
});
