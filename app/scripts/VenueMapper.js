export default class VenueMapper {
  constructor(users, venues) {
    this.users = users;
    this.venues = venues;
  }

  getPlacesToGo() {
    return this.venues
      .filter((venue) => {
        let isAllow = true;

        this.users.forEach((user) => {
          isAllow = user.wont_eat.every(userPref => !venue.food.includes(userPref));
        });

        return isAllow;
      })
      .map(venue => venue.name);
  }
}
