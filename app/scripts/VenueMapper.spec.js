/* eslint-disable camelcase */
import VenueMapper from './VenueMapper';

describe('VenueMapper', () => {
  it('should return one place to go when food does not conflict', () => {
    const user = {name: 'John Davis', wont_eat: ['Mexican']};
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
});
