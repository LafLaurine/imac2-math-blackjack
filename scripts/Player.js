	/*
		Constructor
		@param {String} element - The DOM element
		@param {Array} hand - the array which holds all the cards
	*/
	function Player(element, hand) {
	    this.hand = hand;
	    this.element = element;
	}

	/*
		Hit player with new card from the deck
		@param {Card} card - the card to deal to the player
	*/
	Player.prototype.hit = function (card) {
	    this.hand.push(card);
	}

	/*
		Returns the total score of all the cards in the hand of a player
	*/
	Player.prototype.getScore = function () {
	    var points = 0;
	    for (var i = 0; i < this.hand.length; i++) {
	        if (i == 0) points = this.hand[i].getValue(0);
	        else points += this.hand[i].getValue(points);
	    }
	    return points;
	}

	/*
		Returns the array (hand) of cards
	*/
	Player.prototype.showHand = function () {
	    var hand = "";
	    for (var i = 0; i < this.hand.length; i++) {
	        hand += this.hand[i].view();
	    }
	    return hand;
	}