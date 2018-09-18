export default class UserState {
  get selectedUsers() {
    return this._selectedUsers;
  }

  constructor() {
    this._selectedUsers = [];
  }

  add(user) {
    if (!this._selectedUsers.some(selUser => selUser.name === user.name)) {
      this._selectedUsers = [...this._selectedUsers, user];
    }
  }
}
