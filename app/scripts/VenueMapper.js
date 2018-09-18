window.timeout = window.timeout || {};
window.timeout.VenueMapper = class VenueMapper {

  static _createReason(fullName, reason) {
    const [firstName] = fullName.split(' ');

    return `There is nothing for ${firstName} to ${reason}`;
  }

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
      const servesADrinkTheyLike = user.drinks.some(userPref => {
        return venue.drinks.includes(userPref);
      });

      if (!matchesAllFoodPrefs && !servesADrinkTheyLike) {
        reasons.push(VenueMapper._createReason(user.name, 'eat or drink'));
      } else if (!matchesAllFoodPrefs) {
        reasons.push(VenueMapper._createReason(user.name, 'eat'));
      } else if (!servesADrinkTheyLike) {
        reasons.push(VenueMapper._createReason(user.name, 'drink'));
      }
    });

    return reasons;
  }
};
