var Deck = new function () {
	this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['hearts', 'spades', 'diamonds', 'clubs'];
	this.deck;
	this.ranksSmall = ['A', '7', '8', '9', '10', 'J', 'Q', 'K'];

	this.inequalRanks = ['A', 'A', 'A', 'K', '5', '2', '7', '8', '9', '10', 'J', 'Q', 'K'];

	/*
	    Fills up the deck array with cards
	*/

	this.init = function () {
		this.deck = []; //empty the array
		for (var suits = 3; suits >= 0; suits--) {
			for (var ranks = 12; ranks >= 0; ranks--) {
				this.deck.push(new Card(this.ranks[ranks], this.suits[suits]));
			}
		}
	}
	
	this.initSmall = function () {
		this.deck = []; //empty the array
		for (var suits = 3; suits >= 0; suits--) {
			for (var ranks = 7; ranks >= 0; ranks--) {
				this.deck.push(new Card(this.ranks[ranks], this.suits[suits]));
			}
		}
	}

	this.initInequally = function () {
		this.deck = []; //empty the array
		for (var suits = 3; suits >= 0; suits--) {
			for (var ranks = 12; ranks >= 0; ranks--) {
				this.deck.push(new Card(this.inequalRanks[ranks], this.suits[suits]));
			}
		}
	}

	this.initInequallySmall = function() {
		this.deck = []; //empty the array
		for (var suits = 3; suits >= 0; suits--) {
			for (var ranks = 7; ranks >= 0; ranks--) {
				this.deck.push(new Card(this.inequalRanks[ranks], this.suits[suits]));
			}
		}	
	}

	/*
	    Shuffles the cards in the deck randomly
	*/
	this.shuffle = function () {
		/*var j, x, i;
		for (i = this.deck.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = this.deck[i - 1];
			this.deck[i - 1] = this.deck[j];
			this.deck[j] = x;
		}*/

		// for 1000 turns
		// switch the values of two random cards
		for (var i = 0; i < 1000; i++) {
			var location1 = Math.floor((Math.random() * this.deck.length));
			var location2 = Math.floor((Math.random() * this.deck.length));
			var tmp = this.deck[location1];

			this.deck[location1] = this.deck[location2];
			this.deck[location2] = tmp;
		}
	}

}