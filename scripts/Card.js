/*
	Constructor
	@param {String} rank
	@param {String} suit
*/
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    key() {
        return `${this.rank}${this.suit}`;
    }
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
        '♡': '&#9829;',
        '♢': '&#9830;',
        '♧': '&#9827;',
        '♤': '&#9824;'
    }
    return `
			<div class="card ` + this.suit + `">
				<div class="top rank">` + this.rank + `</div>
				<div class="suit">` + htmlEntities[this.suit] + `</div>
				<div class="bottom rank">` + this.rank + `</div>
			</div>
		`;
}