class Card {
	constructor(rank,suit) {
		this.rank = rank;
		this.suit = suit;
	}

	key() {
		return `${this.rank}${this.suit}`;
	}
}

//init : 2 % luck to be draw

const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suits = ['♡', '♤', '♢', '♧'];

//weight of each element
const weightInequal = {
	"A♡" : 4.75,
	"A♤": 4.75,
	"A♢": 4.75,
	"A♧": 4.75
} 
const weightIneq = eval(Object.values(weightInequal).join("+"))
const totalweightIneq = ((100 - weightIneq) / 12) / 4;

/*const weights = [];

for(let i = 0; i < 4; i++) {
	weights.push(Object.values(weightInequal)[i]);
} 
for(let i = 0; i < 48; i++) {
	weights.push(totalweightIneq);
}*/

for(let i = 0; i < 12; i++) {
	weightInequal[ranks[i + 1] + "♡"] = totalweightIneq;
	weightInequal[ranks[i + 1] + "♤"] = totalweightIneq;
	weightInequal[ranks[i + 1] + "♢"] = totalweightIneq;
	weightInequal[ranks[i + 1] + "♧"] = totalweightIneq;
}

class Deck {
	constructor() {
		this.init();
	} 
	/*
	    Fills up the deck array with cards
	*/

	init() {
		this.deck = []; //empty the array
		for (let s = 3; s >= 0; s--) {
			for (let r = 12; r >= 0; r--) {
				this.deck.push(new Card(ranks[r], suits[s]));
			}
		}
	}

	draw() {
		return this.deck.splice(0,1)[0];
	}

	shuffle() {
		for (let i = this.deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
	}
	
	shuffleInequal() {
		/*const sampler = new WeightedSampler(Object.keys(weightInequal), weights);
		let randomArray = Array.apply(null, Array(this.deck.length)).map(() => sampler.get());
		const index = sampler.elements.indexOf(sampler.get());
		sampler.elements.splice(index, 1);
		randomArray.splice(0,1)[0];*/

		let obj = JSON.parse(JSON.stringify(weightInequal));

		for(let i=0;i<1;i++)
		{
			let weights = Object.values(obj);
			let cards = Object.keys(obj);
			let totalWeight = 0;
			for(let val =0;val<weights.length;val++)
			{
				totalWeight+=weights[val];
			}
			console.log(totalWeight);

			let rand = Math.random() * (totalWeight + 1);

			let card = cards.find((element, index) => rand <= weights[index]);

			console.log(rand,card);

			//let sampler = new WeightedSampler(Object.keys(arr), Object.values(arr));
			//console.log(weightInequal);
		}

	}

}
/*
class WeightedSampler {
    constructor(elements, weights) {
        this.total = 0;
        this.elements = Array.from(elements);
		this.cweights = weights.map(weight => this.total += weight);

		console.log(this.cweights,this.total);
    }
    get() {
		let random = Math.random() * this.total;
        return this.elements.find((element, index) => random < this.cweights[index]);
    }
}*/

let deck = new Deck();

/*
for(let tirage = 1;tirage<=10;tirage++)
{
	deck.init();
	deck.shuffle();
	document.getElementById("truc").append(`tirage ${tirage}`);
	document.getElementById("truc").append(document.createElement("br"));
	for(let i =0 ;i<10;i++)
		document.getElementById("truc").append(deck.draw().key() + "     ");

	document.getElementById("truc").append(document.createElement("br"))
}*/

deck.init();

for(let tirage = 1;tirage<=10;tirage++)
{
	deck.init();
	document.getElementById("truc").append(`tirage ${tirage}`);
	document.getElementById("truc").append(document.createElement("br"));
	document.getElementById("truc").append(document.createElement("br"))
}

document.getElementById("truc").append(	deck.shuffleInequal() + "     ");