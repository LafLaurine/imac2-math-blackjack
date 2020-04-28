/*
	Constructor
	@param {String} rank
	@param {String} suit
*/
function Card(rank, suit, weight) {
    this.rank = rank;
    this.suit = suit;
    this.weight = weight;
}

/*
	Gets the value or points of the card
	@param {Integer} currentTotal - The current total score of the
	player's hand
*/
Card.prototype.getValue = function (currentTotal) {
    let value = 0;
    if (this.rank == 'A' && currentTotal < 11) {
        value = 11;
    } else if (this.rank == 'A') {
        value = 1;
    } else if (this.rank == 'J' || this.rank == 'Q' || this.rank == 'K') {
        value = 10;
    } else {
        value = parseInt(this.rank);
    }
    return value;
}

Card.prototype.view = function () {
    const htmlEntities = {
        'hearts': '&#9829;',
        'diamonds': '&#9830;',
        'clubs': '&#9827;',
        'spades': '&#9824;'
    }
    return `
			<div class="card ` + this.suit + `">
				<div class="top rank">` + this.rank + `</div>
				<div class="suit">` + htmlEntities[this.suit] + `</div>
				<div class="bottom rank">` + this.rank + `</div>
			</div>
		`;
}