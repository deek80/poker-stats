import {mapValues, sum, numberSort} from "./misc";

class Tournament {
  constructor({cost, payouts, results = {}}) {
    /*
     * cost:
     *   the price to enter the tournament.
     *
     * payouts: a map of {place: payout} pairs to hold the
     *   pay structure of the tournament. For example:
     *     payouts = {1: 4.95, 2: 3.00, 3: 1.00}
     *   would indicate that first place pays $4.95, second pays $3.00, third
     *   pays $1.00, and all other places are a loss.
     *
     * results: a map of {place: count} pairs to record your
     *   tournament history. For example, a 9-person sit-n-go result map
     *   might look like:
     *     results = {1: 2, 3:10, 0: 12}
     *   and would indicate a history of:
     *     - 2 first place finishes
     *     - 0 second place finishes (note: missing key means 0)
     *     - 10 third place finishes
     *     - 12 losses (note: keys must be numeric, but you can just pick 0 or 999 or
     *                  whatever you want to mean "a loss" if you don't care about the
     *                  exact finish position)
     */
    this.cost = cost;
    this.payouts = payouts;
    this.results = results;
  }

  get data() {
    return {cost: this.cost, payouts: this.payouts, results: this.results};
  }

  get finishingPlaces() {
    return Object.keys(this.results).sort(numberSort);
  }

  get gamesPlayed() {
    return sum(Object.values(this.results));
  }

  get totalCost() {
    return this.gamesPlayed * this.cost;
  }

  get payoutsMap() {
    return mapValues(
      this.results,
      (place, count) => count * (this.payouts[place] ?? 0)
    );
  }

  get totalPayout() {
    return sum(Object.values(this.payoutsMap));
  }

  get netPayout() {
    return this.totalPayout - this.totalCost;
  }
}

export {Tournament};
