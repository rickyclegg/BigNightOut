(() => {
  function hideLoader() {
    document.querySelector('.loading-component').style.setProperty('display', 'none');
  }

  function setupUsers(users) {
    const userListEl = document.querySelector('.user-list');

    userListEl.innerHTML =
      users.map(user => `<li class="list-item">${user.name}</li>`).join('');
  }

  Promise.all([
    fetch('/data/users.json'),
    fetch('/data/venues.json')
  ])
    .then(([userRes, venuesRes]) => {
      return Promise.all([
        userRes.json(),
        venuesRes.json()
      ]);
    })
    .then(([usersData]) => {
      hideLoader();
      setupUsers(usersData);
    });
})();
