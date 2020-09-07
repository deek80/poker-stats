class Tournament {
  constructor({rates = {}, counts = {loss: 0}}) {
    /*
     * rates: a map of {place: pay_rate} pairs to hold the *net* payout
     * for each position (actual payout - buy-in). i.e.
     *     rates = {1: 5.95, 2: 3.00, 3: 1.00, loss: -3.30}
     * would indicate that first place nets you $5.95 ($9.25 minus 3.30 buy-in),
     * and that finishing outside of the top 3 pays nothing (and costs the buy-in).
     *
     * counts: a map of {place: count} pairs to record your tournament history. i.e.
     *     counts = {1: 2, 3:10, loss: 12}
     * would indicate a history of 2 first place, 0 second, 3 third, and 12 losses.
     */
    this.rates = rates;
    this.counts = counts;
  }

  _count = place => this.counts[place] ?? 0;
  _rate = place => this.rates[place] ?? 0;

  static _keySort(a, b) {
    return a === "loss" ? 1 : b === "loss" ? -1 : a - b;
  }

  get data() {
    return {rates: this.rates, counts: this.counts};
  }

  get summary() {
    return Object.keys(this.rates)
      .sort(this._keySort)
      .map(place => ({
        place,
        rate: this._rate(place),
        count: this._count(place),
        net: this._rate(place) * this._count(place),
      }));
  }
}

export {Tournament};
