export default class VenueMapper {
  constructor(users, venues) {
    this.users = users;
    this.venues = venues;
  }

  getPlacesToGo() {
    return this.venues
      .filter((venue) => {
        let isAllowed = true;

        this.users.forEach((user) => {
          isAllowed = user.wont_eat.every(userPref => !venue.food.includes(userPref));
        });

        return isAllowed;
      })
      .map(venue => venue.name);
  }
}
