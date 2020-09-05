import {add} from "./misc";

class Tournament {
  constructor({payouts, results = {loss: 0}}) {
    /*
     * payouts: a map of {place: payout} pairs to hold the *net* payout
     *   for each position (actual payout - buy-in). i.e.
     *     payouts = {1: 5.95, 2: 3.00, 3: 1.00, loss: -3.30}
     *   would indicate that first place pays $9.25 (but you paid 3.30 to play),
     *   second pays 6.60 minus buy-in, and a loss pays 0 (and again cost 3.30 to play).
     *
     * results: a map of {place: count} pairs to record your
     *   tournament history. For example, a 9-person sit-n-go result map
     *   might look like:
     *     results = {1: 2, 3:10, loss: 12}
     *   and would indicate a history of:
     *     - 2 first place finishes
     *     - 0 second place finishes (note: missing key means 0)
     *     - 10 third place finishes
     *     - 12 losses
     *
     * TODO: i think as is, i'm going with a "write the whole tree every change"
     * which seems kinda shitty. maybe this tournament should be returned from a hook
     * and have methods like "recordResult" and whatnot, and just change the data
     * at the deepest key/value possible.
     */
    this.payouts = payouts;
    this.results = results;
  }

  static _keySort(a, b) {
    // sort by int value, except for the string "loss" which should come last
    if (a === "loss") {
      return 1;
    }
    if (b === "loss") {
      return -1;
    }
    return a - b;
  }

  _keys = obj => Object.keys(obj).sort(this._keySort);
  _result = place => this.results[place] ?? 0;
  _payout = place => this.payouts[place] ?? 0;

  get data() {
    return {payouts: this.payouts, results: this.results};
  }

  get payoutsByPlace() {
    const payoutRows = this._keys(this.payouts).map(place => ({
      place,
      count: this._result(place),
      payout: this._result(place) * this._payout(place),
    }));

    const total = {
      place: "Total:",
      count: payoutRows.map(r => r.count).reduce(add, 0),
      payout: payoutRows.map(r => r.payout).reduce(add, 0),
    };

    return [...payoutRows, total];
  }
}

export {Tournament};
