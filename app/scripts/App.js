window.timeout = window.timeout || {};
window.timeout.App = class App {
  constructor(element) {
    this.element = element;
  }

  async start() {
    const [usersData, venuesData] = await this._getData();

    this.usersData = usersData;
    this.venuesData = venuesData;

    this._hideLoader();
    this._setupUsers();
    this._setupState();
    this._updateResults();
  }

  async _getData() {
    const userRes = await this._getJSON(timeout.App.URL_USERS);
    const venuesRes = await this._getJSON(timeout.App.URL_VENUES);

    return [await userRes.json(), await venuesRes.json()];
  }

  _getJSON(url) {
    return fetch(url);
  }

  _hideLoader() {
    this.element.querySelector(timeout.App.SELECTOR_LOADER)
      .style
      .setProperty('display', 'none');
  }

  _setupUsers() {
    const userListEl = this.element.querySelector(timeout.App.SELECTOR_USER_LIST);

    userListEl.innerHTML =
      this.usersData.map(user => `<li class="list-item">${user.name}</li>`)
        .join('');

    userListEl.onclick = this._onUserClick.bind(this);
  }

  _setupState() {
    this.state = new timeout.UserState();
  }

  _onUserClick(event) {
    const listItem = event.target;
    const [selectedUser] = this.usersData.filter(user => user.name === listItem.innerText);
    const isSelected = listItem.classList.contains(timeout.App.CLASS_SELECTED);

    if (selectedUser && isSelected) {
      this.state.remove(selectedUser);
      listItem.classList.remove(timeout.App.CLASS_SELECTED);
    } else if (selectedUser && !isSelected) {
      this.state.add(selectedUser);
      listItem.classList.add(timeout.App.CLASS_SELECTED);
    }

    this._updateResults();
  }

  _updateResults() {
    const vm = new timeout.VenueMapper(this.state.selectedUsers, this.venuesData);
    const {canGo, cannotGo} = vm.getVenueAvailability();

    this._renderSafePlaces(canGo);
    this._renderUnsafePlaces(cannotGo);
  }

  _renderSafePlaces(canGo) {
    const canGoList = this.element.querySelector(timeout.App.SELECTOR_CAN_GO);

    if (this._canRenderSafePlaces(canGo)) {
      canGoList.innerHTML =
        canGo.map(venue => `<li></li>${venue}</li>`)
          .join('');
    } else {
      canGoList.innerHTML = '<li>There\'s nowhere that suits everyone</li>';
    }
  }

  _canRenderSafePlaces(canGo) {
    return canGo.length > 0 && this.state.selectedUsers.length > 0;
  }

  _renderUnsafePlaces(cannotGo) {
    const cannotGoList = this.element.querySelector(timeout.App.SELECTOR_CANNOT_GO);

    if (this._canRenderUnsafePlaces(cannotGo)) {
      cannotGoList.innerHTML =
        cannotGo.map(venue => {
          const reasons = venue.reasons.map(reason => `<li>${reason}</li>`)
            .join('');

          return `<li>${venue.name}<ul>${reasons}</ul></li>`;
        })
          .join('');
    } else {
      cannotGoList.innerHTML = '<li>You\'re good to go</li>';
    }
  }

  _canRenderUnsafePlaces(canGo) {
    return canGo.length > 0 && this.state.selectedUsers.length > 0;
  }
};

window.timeout.App.URL_USERS = '/data/users.json';
window.timeout.App.URL_VENUES = '/data/venues.json';
window.timeout.App.SELECTOR_LOADER = '.loading-component';
window.timeout.App.SELECTOR_USER_LIST = '.user-list';
window.timeout.App.SELECTOR_CAN_GO = '.can-go-places';
window.timeout.App.SELECTOR_CANNOT_GO = '.cannot-go-places';
window.timeout.App.CLASS_SELECTED = 'list-item-selected';
