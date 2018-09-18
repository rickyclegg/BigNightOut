window.timeout = window.timeout || {};
window.timeout.UserState = class UserState {
  get selectedUsers() {
    return this._selectedUsers;
  }

  constructor() {
    this._selectedUsers = [];
  }

  add(user) {
    if (!this.selectedUsers.some(selUser => selUser.name === user.name)) {
      this._selectedUsers = [...this.selectedUsers, user];
    }
  }

  remove(user) {
    const userName = typeof user === 'object' ? user.name : user;
    let userIndex = -1;

    this.selectedUsers.some((selUser, index) => {
      userIndex = selUser.name === userName && index || -1;

      return userIndex > -1;
    });

    if (userIndex > -1) {
      this._selectedUsers = [...this.selectedUsers];
      this._selectedUsers.splice(userIndex, 1);
    }
  }
};
