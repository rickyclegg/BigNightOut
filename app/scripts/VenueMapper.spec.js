/* eslint-disable camelcase */
import VenueMapper from './VenueMapper';

describe('VenueMapper', () => {
  it('should return one place to go when food does not conflict', () => {
    const user = {
      name: 'John Davis',
      wont_eat: ['Fish']
    };
    const venue = {
      food: ['Mexican'],
      name: 'El Cantina'
    };
    const vm = new VenueMapper([user], [venue]);

    expect(vm.getPlacesToGo()).toEqual(['El Cantina']);
  });
});