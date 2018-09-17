export default class VenueMapper {
  constructor(users, venues) {
    this.users = users;
    this.venues = venues;
  }

  getPlacesToGo() {
    return this.venues
      .filter((venue) => {
        return this._canPartyAtVenue(venue);
      })
      .map(venue => venue.name);
  }

  _canPartyAtVenue(venue) {
    return this.users.every((user) => {
      return !user.wont_eat.some(userPref => venue.food.includes(userPref));
    });
  }
}
