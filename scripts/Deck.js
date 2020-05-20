const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♡', '♤', '♢', '♧'];
const ranksSmall = ['A', '7', '8', '9', '10', 'J', 'Q', 'K'];
var prob = [10]; //Chances of being selected
//A♡ has 10% chance to be draw, other card have 1.77%
for (let s = 0; s < 51; s++) {
	prob.push(1.77);
}

class Deck {
	constructor() {
		this.init();
	}
	/*
		getRandomCard() {
			if (this.ranks.length = 12) {
				while (currentCard < this.ranks.length) { //step through each this.ranks element
					for (i = 0; i < this.weight[currentCard]; i++)
						weighedCards[weighedCards.length] = this.ranks[currentCard]
					currentCard++
				}
				const randomnumber = Math.floor(Math.random() * totalweight)
				return randomnumber;
			} else {
				while (currentCard < this.ranks.length) { //step through each this.ranks element
					for (i = 0; i < this.weightSmall[currentCard]; i++)
						weighedCards[weighedCards.length] = this.ranks[currentCard]
					currentCard++
				}
				const randomnumber = Math.floor(Math.random() * totalweightSmall)
				return randomnumber;
			}
		}

		getRandomCardInequal() {
			if (this.ranks.length = 12) {
				while (currentCard < this.ranks.length) { //step through each this.ranks element
					for (i = 0; i < this.weightInequal[currentCard]; i++)
						weighedCards[weighedCards.length] = this.ranks[currentCard]
					currentCard++
				}
				const randomnumber = Math.floor(Math.random() * totalweightIneq)
				return randomnumber;
			} else {
				while (currentCard < this.ranks.length) { //step through each this.ranks element
					for (i = 0; i < this.weightInequalSmall[currentCard]; i++)
						weighedCards[weighedCards.length] = this.ranks[currentCard]
					currentCard++
				}
				const randomnumber = Math.floor(Math.random() * totalweightIneqSmall)
				return randomnumber;
			}
		}*/

	/*
	    Fills up the deck array with cards
	*/

	init() {
		this.deck = []; //empty the array
	}

	initEqual() {
		for (let s = 0; s < 4; s++) {
			for (let r = 0; r < 13; r++) {
				this.deck.push(new Card(ranks[r], suits[s]));
			}
		}
	}

	initSmall() {
		for (let s = 0; s < 4; s++) {
			for (let r = 0; r < 7; r++) {
				this.deck.push(new Card(ranks[r], suits[s]));
			}
		}
	}


	draw() {
		return this.deck.splice(0, 1)[0];
	}

	shuffle() {
		for (let i = this.deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
	}

	chooseWeighted(deck, prob) {
		var sum = prob.reduce((acc, el) => acc + el, 0);
		var acc = 0;
		prob = prob.map(el => (acc = el + acc));
		var rand = Math.random() * sum;
		return Object.values(deck[prob.filter(el => el <= rand).length]);
	}

	shuffleInequal() {
		let obj = {};
		for (let i = 0; i < deck.length; i++) {
			obj[Object.values(deck[i])] = 0;
		}

		for (let i = 0; i < 1000; i++) {
			let rnd = chooseWeighted(deck, prob);
			obj[rnd] += 1;
		}
		return obj;
	}

}