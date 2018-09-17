/* eslint-disable camelcase */
import VenueMapper from './VenueMapper';

// User old school require to easily get test data
const usersData = require('../data/users.json');
const venuesData = require('../data/venues.json');

describe('VenueMapper', () => {
  it('should return one place to go when food does not conflict', () => {
    const user = {name: 'John Davis', wont_eat: ['Fish']};
    const venue = {food: ['Mexican'], name: 'El Cantina'};
    const vm = new VenueMapper([user], [venue]);

    expect(vm.getPlacesToGo()).toEqual(['El Cantina']);
  });

  it('should return no venues when there are no matches', () => {
    const user = {name: 'John Davis', wont_eat: ['Mexican']};
    const venue = {food: ['Mexican'], name: 'El Cantina'};
    const vm = new VenueMapper([user], [venue]);

    expect(vm.getPlacesToGo().length).toEqual(0);
  });

  it('should return no venues when a user conflicts with another', () => {
    const user1 = {name: 'John Davis', wont_eat: ['Fish']};
    const user2 = {name: 'Bob Dylan', wont_eat: ['Mexican']};
    const venue = {food: ['Mexican'], name: 'El Cantina'};
    const vm = new VenueMapper([user1, user2], [venue]);

    expect(vm.getPlacesToGo().length).toEqual(0);
  });

  it('should return 4 venues when Fish, Eggs, Pasta, Bread, Pasta are not allowed', () => {
    const vm = new VenueMapper(usersData.slice(0, 3), venuesData);

    expect(vm.getPlacesToGo()).toEqual([
      'El Cantina',
      'Twin Dynasty',
      'Wagamama',
      'Spirit House'
    ]);
  });
});
