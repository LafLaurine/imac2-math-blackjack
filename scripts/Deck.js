const Deck = new function () {
	this.deck;
	this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['hearts', 'spades', 'diamonds', 'clubs'];
	this.ranksSmall = ['A', '7', '8', '9', '10', 'J', 'Q', 'K'];

	//Weights
	this.weight = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2] //weight of each element 
	this.weightInequal = [19, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72] //weight of each element 
	this.weightSmall = [2, 2, 2, 2, 2, 2, 2, 2] //weight of each element 
	this.weightInequalSmall = [19, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72, 6.72] //weight of each element 

	const totalweight = eval(this.weight.join("+")) //get total weight 
	const totalweightSmall = eval(this.weight.join("+")) //get total weight 
	const totalweightIneq = eval(this.weightInequal.join("+")) //get total weight
	const totalweightIneqSmall = eval(this.weightInequal.join("+")) //get total weight
	const weighedCards = new Array() //new array to hold "weighted" cards
	let currentCard = 0

	this.getRandomCard = function () {
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

	this.getRandomCardInequal = function () {
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
	}

	/*
	    Fills up the deck array with cards
	*/

	this.init = function () {
		this.deck = []; //empty the array
		for (let suits = 3; suits >= 0; suits--) {
			for (let ranks = 12; ranks >= 0; ranks--) {
				this.deck.push(new Card(this.ranks[ranks], this.suits[suits], this.weight[ranks]));
			}
		}
	}

	this.initSmall = function () {
		this.deck = []; //empty the array
		for (let suits = 3; suits >= 0; suits--) {
			for (let ranksSmall = 7; ranksSmall >= 0; ranksSmall--) {
				this.deck.push(new Card(this.ranks[ranksSmall], this.suits[suits], this.weight[ranksSmall]));
			}
		}

	}

	this.shuffle = function () {
		for (let i = 0; i < 1000; i++) {
			let location1 = Math.floor((Math.random() * this.deck.length));
			let location2 = Math.floor((Math.random() * this.deck.length));
			let tmp = this.deck[location1];

			this.deck[location1] = this.deck[location2];
			this.deck[location2] = tmp;
		}
	}

}