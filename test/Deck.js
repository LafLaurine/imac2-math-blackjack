function Card(rank, suit, weight) {
	this.rank = rank;
	this.suit = suit;
	this.weight = weight;
}


let Deck = new function () {
	this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['hearts', 'spades', 'diamonds', 'clubs'];
	this.deck;

	this.weightInequal = [19, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72] //weight of each element 
	const totalweightIneq = eval(this.weightInequal.join("+")) //get total weight

	const weighedCards = new Array() //new array to hold "weighted" cards
	const currentCard = 0

	this.getRandomCardInequal = function () {
		while (currentCard < this.ranks.length) { //step through each this.ranks element
			for (i = 0; i < this.weightInequal[currentCard]; i++)
				weighedCards[weighedCards.length] = this.ranks[currentCard]
			currentCard++
		}
		const randomnumber = Math.floor(Math.random() * totalweightIneq)
		return weighedCards[randomnumber]
	}

	/*
	    Fills up the deck array with cards
	*/

	this.init = function () {
		this.deck = []; //empty the array
		for (let suits = 3; suits >= 0; suits--) {
			for (let ranks = 12; ranks >= 0; ranks--) {
				this.deck.push(new Card(this.ranks[ranks], this.suits[suits], this.weightInequal[ranks]));
			}
		}
	}

}

Deck.init()
console.log(Deck.deck)
const container = document.getElementById('truc');
for (let i = 0; i < 52; i++) {
	container.append('<div>' + Deck.getRandomCardInequal() + '</div>');
	console.log(Deck.getRandomCardInequal())
}