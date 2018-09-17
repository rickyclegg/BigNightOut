export default class VenueMapper {

  constructor(users, venues) {
    this.users = users;
    this.venues = venues;
  }

  getVenueAvailability() {
    const cannotGo = [];
    const canGo = [];

    this.venues.forEach(venue => {
      const reasons = this._getReasonsVenueIsNoGood(venue);

      if (reasons.length > 0) {
        cannotGo.push({name: venue.name, reasons});
      } else {
        canGo.push(venue.name);
      }
    });

    return {canGo, cannotGo};
  }

  _getReasonsVenueIsNoGood(venue) {
    const reasons = [];

    this.users.forEach(user => {
      const matchesAllFoodPrefs = !user.wont_eat.some(userPref => {
        return venue.food.includes(userPref);
      });

      if (!matchesAllFoodPrefs) {
        reasons.push(`There is nothing for ${user.name.split(' ')[0]} to eat`);
      }
    });

    return reasons;
  }
}
