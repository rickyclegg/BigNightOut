/* eslint-disable camelcase */
import VenueMapper from './VenueMapper';

// User old school require to easily get test data
const usersData = require('../data/users.json');
const venuesData = require('../data/venues.json');

describe('VenueMapper', () => {
  describe('Can go to', () => {
    it('should return one place to go when food does not conflict', () => {
      const user = {name: 'John Davis', wont_eat: ['Fish']};
      const venue = {food: ['Mexican'], name: 'El Cantina'};
      const vm = new VenueMapper([user], [venue]);

      expect(vm.getVenueAvailability().canGo).toEqual(['El Cantina']);
    });

    it('should return no venues when there are no matches', () => {
      const user = {name: 'John Davis', wont_eat: ['Mexican']};
      const venue = {food: ['Mexican'], name: 'El Cantina'};
      const vm = new VenueMapper([user], [venue]);

      expect(vm.getVenueAvailability().canGo.length).toEqual(0);
    });

    it('should return no venues when a user conflicts with another', () => {
      const user1 = {name: 'John Davis', wont_eat: ['Fish']};
      const user2 = {name: 'Bob Dylan', wont_eat: ['Mexican']};
      const venue = {food: ['Mexican'], name: 'El Cantina'};
      const vm = new VenueMapper([user1, user2], [venue]);

      expect(vm.getVenueAvailability().canGo.length).toEqual(0);
    });

    it('should return 4 venues when Fish, Eggs, Pasta, Bread, Pasta are not allowed', () => {
      const vm = new VenueMapper(usersData.slice(0, 3), venuesData);

      expect(vm.getVenueAvailability().canGo).toEqual([
        'El Cantina',
        'Twin Dynasty',
        'Wagamama',
        'Spirit House'
      ]);
    });
  });

  describe('Cannot go to', () => {
    it('should return 1 reason why we cannot have mexican', () => {
      const user = {name: 'John Davis', wont_eat: ['Mexican']};
      const venue = {food: ['Mexican'], name: 'El Cantina'};
      const vm = new VenueMapper([user], [venue]);

      expect(vm.getVenueAvailability().cannotGo).toEqual([
        {
          name: 'El Cantina',
          reasons: ['There is nothing for John to eat']
        }
      ]);
    });

    it('should return ', () => {
      const vm = new VenueMapper(usersData.slice(0, 3), venuesData);

      expect(vm.getVenueAvailability().cannotGo).toEqual([
        {
          name: 'Spice of life',
          reasons: [
            'There is nothing for John to eat',
            'There is nothing for Gary to eat',
            'There is nothing for Robert to eat'
          ]
        },
        {
          name: 'The Cambridge',
          reasons: [
            'There is nothing for John to eat',
            'There is nothing for Gary to eat',
            'There is nothing for Robert to eat'
          ]
        },
        {
          name: 'Sultan Sofrasi',
          reasons: [
            'There is nothing for John to eat',
            'There is nothing for Robert to eat'
          ]
        },
        {
          name: 'Tally Joe',
          reasons: [
            'There is nothing for John to eat'
          ]
        },
        {
          name: 'Fabrique',
          reasons: [
            'There is nothing for Robert to eat'
          ]
        }
      ]);
    });
  });
});
