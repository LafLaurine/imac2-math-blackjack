var Deck = new function () {
    this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    this.deck;

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

    /*
        Shuffles the cards in the deck randomly
    */

    this.shuffle = function () {
        var j, x, i;
        for (i = this.deck.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = this.deck[i - 1];
            this.deck[i - 1] = this.deck[j];
            this.deck[j] = x;
        }
    }

}