export default class UserState {
  get selectedUsers() {
    return this._selectedUsers;
  }

  constructor() {
    this._selectedUsers = [];
  }

  add(user) {
    this._selectedUsers.push(user);
  }
}
