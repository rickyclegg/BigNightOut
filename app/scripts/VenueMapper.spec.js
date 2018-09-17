/* eslint-disable camelcase */
import VenueMapper from './VenueMapper';

// User old school require to easily get test data
const usersData = require('../data/users.json');
const venuesData = require('../data/venues.json');

describe('VenueMapper', () => {
  describe('Can go to', () => {
    it('should return one place to go when food does not conflict', () => {
      const venue = {
        drinks: ['Vokda', 'Gin', 'whisky', 'Cider'],
        food: ['Eggs', 'Meat', 'Pasta', 'Dairy'],
        name: 'Spice of life'
      };
      const vm = new VenueMapper(usersData.slice(0, 1), [venue]);

      expect(vm.getVenueAvailability().canGo).toEqual(['Spice of life']);
    });

    it('should return no venues when there are no matches', () => {
      const venue = {
        drinks: ['Vokda', 'Gin', 'whisky', 'Beer'],
        food: ['Eggs', 'Meat', 'Pasta', 'Dairy'],
        name: 'Spice of life'
      };
      const vm = new VenueMapper(usersData.slice(0, 1), [venue]);
      const availability = vm.getVenueAvailability();

      expect(availability.canGo.length).toEqual(0);
      expect(availability.cannotGo).toEqual([
        {
          name: 'Spice of life',
          reasons: ['There is nothing for John to drink']
        }
      ]);
    });

    it('should return no venues when a user conflicts with another', () => {
      const venue = {
        drinks: ['Vokda', 'Gin', 'whisky', 'Cider'],
        food: ['Eggs', 'Meat', 'Fish', 'Pasta', 'Dairy'],
        name: 'Spice of life'
      };
      const vm = new VenueMapper(usersData.slice(0, 2), [venue]);

      expect(vm.getVenueAvailability().canGo.length).toEqual(0);
    });

    it('should return 4 venues when Fish, Eggs, Pasta, Bread, Pasta are not allowed', () => {
      const vm = new VenueMapper(usersData.slice(0, 3), venuesData);

      expect(vm.getVenueAvailability().canGo).toEqual(['Spirit House']);
    });
  });

  describe('Cannot go to', () => {
    it('should return 1 reason why we cannot have mexican', () => {
      const venue = {
        drinks: ['Vokda', 'Gin', 'whisky', 'Beer'],
        food: ['Eggs', 'Meat', 'Pasta', 'Dairy'],
        name: 'Spice of life'
      };
      const vm = new VenueMapper(usersData.slice(0, 1), [venue]);

      expect(vm.getVenueAvailability().cannotGo).toEqual([
        {
          name: 'Spice of life',
          reasons: ['There is nothing for John to drink']
        }
      ]);
    });

    it('should return a reason for each person why they cannot eat or drink at that venue', () => {
      const vm = new VenueMapper(usersData.slice(0, 3), venuesData);

      expect(vm.getVenueAvailability().cannotGo).toEqual([
        {
          name: 'El Cantina',
          reasons: [
            'There is nothing for Robert to drink'
          ]
        },
        {
          name: 'Twin Dynasty',
          reasons: [
            'There is nothing for Gary to drink'
          ]
        },
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
          name: 'Wagamama',
          reasons: [
            'There is nothing for Gary to drink',
            'There is nothing for Robert to drink'
          ]
        },
        {
          name: 'Sultan Sofrasi',
          reasons: [
            'There is nothing for John to eat',
            'There is nothing for Gary to drink',
            'There is nothing for Robert to eat or drink'
          ]
        },
        {
          name: 'Tally Joe',
          reasons: [
            'There is nothing for John to eat',
            'There is nothing for Gary to drink',
            'There is nothing for Robert to drink'
          ]
        },
        {
          name: 'Fabrique',
          reasons: [
            'There is nothing for John to drink',
            'There is nothing for Robert to eat or drink'
          ]
        }
      ]);
    });
  });
});
