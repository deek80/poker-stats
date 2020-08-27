import {mapValues, sum} from ".";

class Tournament {
  constructor(results, payments) {
    /* results: a map of {place: count} pairs to record your
     * tournament history. For example
     *  results = {1: 2, 3:10, loss: 12}
     * would indicate a history of:
     * - 2 first place finishes
     * - 0 second place finishes (note: missing key means 0)
     * - 10 third place finishes
     * - 12 losses
     *
     * payouts: a map of {place: payout} pairs to hold the
     * pay structure of the tournament. For example:
     *   payments = {1: 4.95, 2: 3.00, 3: 1.00, cost: 1.00}
     * would indicate that first place pays $4.95, second pays $3.00, third
     * pays $1.00, and that it costs $1.00 to play.
     *
     * To keep this flexible, you can have whatever keys you want in
     * both the results and the payouts. If there is a missing key in either,
     * its value will be 0. The only special key will be "cost" in the payments
     * map, which will correspond to the entry fee for the tournament. If for some
     * reason that's missing too, it will also be 0.
     */
    this.results = results;
    this.payments = payments;
  }

  get gamesPlayed() {
    return sum(Object.values(this.results));
  }

  get totalCost() {
    return this.gamesPlayed * (this.payments.cost || 0);
  }

  get grossReturnsByPlace() {
    return mapValues(
      this.results,
      (place, count) => count * (this.payments[place] || 0)
    );
  }

  get grossReturns() {
    return sum(Object.values(this.grossReturnsByPlace));
  }

  get netReturns() {
    return sum(this.grossReturns) - this.totalCost;
  }
}

export {Tournament};
