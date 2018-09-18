/* eslint-disable max-statements,id-length,no-unused-expressions,jasmine/no-unsafe-spy */

describe('App', () => {
  let jQuery;
  let app;
  let usersData;
  let venuesData;

  beforeEach(() => {
    fixture.setBase('app');
    jQuery = setFixtures(fixture.load('fixtures/app.html'));
    usersData = fixture.load('data/users.json');
    venuesData = fixture.load('data/venues.json');

    app = new timeout.App(jQuery.find('#app')[0]);
  });

  afterEach(() => {
    fixture.cleanup();
  });

  it('should contain display loader on start', () => {
    app.start();

    expect(jQuery.find('.loader-component'))
      .not
      .toBeHidden();
  });

  describe('when loaded', () => {
    function setupSpys() {
      spyOn(app, '_getJSON')
        .and
        .callFake(url => {
          function createJsonRes() {
            return new Promise(res => {
              url.includes('users') ? res(usersData) : res(venuesData);
            });
          }

          return new Promise(res => {
            res({json: () => createJsonRes()});
          });
        });
    }

    beforeEach((done) => {
      setupSpys();

      app.start()
        .then(done);
    });

    it('should display all users when loaded', () => {
      expect(jQuery.find('.user-list .list-item').length)
        .toEqual(7);
    });

    it('should display default place messages', () => {
      expect(jQuery.find('.can-go-places li')).toContainText('There\'s nowhere that suits everyone');
      expect(jQuery.find('.cannot-go-places li')).toContainText('You\'re good to go');
    });
  });
});
