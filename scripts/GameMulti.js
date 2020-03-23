var Game = (function () {

    /*
        Start button event handler
    */
    this.startButtonHandler = function () {
        this.start();
        this.startButton.disabled = true;
        this.hitButton.disabled = false;
        this.standButton.disabled = false;
        this.replayButton.disabled = false;
    }

    /*
        Hit button event handler
    */
    this.hitButtonHandler = function () {
        //deal a card and add to player's hand
        var card = Deck.deck.pop();
        if (playerTurn) {
            this.player.hit(card);
            //render the card and score
            document.getElementById(this.player.element).innerHTML += card.view();
            this.playerScore.innerHTML = this.player.getScore();
            //if over, then player looses
            if (this.player.getScore() > 21) {
                playerLost("Player 1 lost");
            }
            playerTurn = false;
        } else {
            this.player2.hit(card);
            //render the card and score
            document.getElementById(this.player2.element).innerHTML += card.view();
            this.player2Score.innerHTML = this.player2.getScore();
            if (this.player2.getScore() > 21) {
                playerLost("Player 2 lost");
            }
            playerTurn = true;
        }

        if (this.player.getScore() > 21 && this.player2.getScore() > 21) {
            this.gameEnded("Both player lost");
        }
    }

    /*
        Stand button event handler
    */
    this.standButtonHandler = function () {

        //deals a card to the dealer until
        //one of the conditions below is true
        while (true) {
            var card = Deck.deck.pop();

            this.dealer.hit(card);
            document.getElementById(this.dealer.element).innerHTML += card.view();
            this.dealerScore.innerHTML = this.dealer.getScore();

            var playerBlackjack = this.player.getScore() == 21,
                player2Blackjack = this.player2.getScore() == 21,
                dealerBlackjack = this.dealer.getScore() == 21;

            //Rule set
            if (dealerBlackjack && !playerBlackjack && !player2Blackjack) {
                this.gameEnded('Both player lost !');
                break;
            } else if (dealerBlackjack && playerBlackjack && player2Blackjack || dealerBlackjack && playerBlackjack || dealerBlackjack && player2Blackjack) {
                this.gameEnded('Draw!');
                break;
            } else if (this.dealer.getScore() > 21 && this.player.getScore() <= 21) {
                this.gameEnded('Player 1 won !');
                break;
            } else if (this.dealer.getScore() > 21 && this.player2.getScore() <= 21) {
                this.gameEnded('Player 2 won !');
                break;
            } else if (dealerBlackjack && !playerBlackjack) {
                this.gameEnded('Player 1 lost');
                break;
            } else if (dealerBlackjack && !player2Blackjack) {
                this.gameEnded('Player 2 lost');
                break;
            } else if (this.dealer.getScore() > this.player.getScore() && this.dealer.getScore() <= 21 && this.player.getScore() < 21) {
                this.gameEnded('Player 1 lost !');
                break;
            } else if (this.dealer.getScore() > this.player2.getScore() && this.dealer.getScore() <= 21 && this.player2.getScore() < 21) {
                this.gameEnded('Player 2 lost !');
                break;
            }
        }
    }
    /*
        Initialise
    */
    this.init = function () {
        this.dealerScore = document.getElementById('dealer-score').getElementsByTagName("span")[0];
        this.playerScore = document.getElementById('player-score').getElementsByTagName("span")[0];
        this.player2Score = document.getElementById('player2-score').getElementsByTagName("span")[0];
        this.startButton = document.getElementById('start');
        this.hitButton = document.getElementById('hit');
        this.standButton = document.getElementById('stand');
        this.replayButton = document.getElementById('replay');

        //attaching event handlers
        this.startButton.addEventListener('click', this.startButtonHandler.bind(this));
        this.hitButton.addEventListener('click', this.hitButtonHandler.bind(this));
        this.standButton.addEventListener('click', this.standButtonHandler.bind(this));
        this.replayButton.addEventListener('click', this.startButtonHandler.bind(this));

    }

    /*
        Start the game
    */
    this.start = function () {
        //initilaise and shuffle the deck of cards
        Deck.init();
        Deck.shuffle();

        //deal one card to dealer
        this.dealer = new Player('dealer', [Deck.deck.pop()]);

        //deal two cards to player
        this.player = new Player('player', [Deck.deck.pop(), Deck.deck.pop()]);

        //deal two cards to player
        this.player2 = new Player('player2', [Deck.deck.pop(), Deck.deck.pop()]);

        //render the cards
        document.getElementById(this.dealer.element).innerHTML = this.dealer.showHand();
        document.getElementById(this.player.element).innerHTML = this.player.showHand();
        document.getElementById(this.player2.element).innerHTML = this.player2.showHand();

        //renders the current scores
        this.dealerScore.innerHTML = this.dealer.getScore();
        this.playerScore.innerHTML = this.player.getScore();
        this.player2Score.innerHTML = this.player2.getScore();
        this.playerTurn = true;
        if (playerTurn) {
            this.setMessage("Player 1 hit or Stand");
        }
        if (!playerTurn) {
            this.setMessage("Player 2 hit or Stand");
        }
    }

    /*
        If the player wins or looses
    */
    this.gameEnded = function (str) {
        this.setMessage(str);
        this.startButton.disabled = false;
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.replayButton.disabled = true;
    }

    this.playerLost = function (str) {
        this.setMessage(str);
        this.playerTurn = !this.playerTurn;
    }

    /*
        Instructions or status of game
    */
    this.setMessage = function (str) {
        document.getElementById('status').innerHTML = str;
    }

    return {
        init: this.init.bind(this)
    }


})()