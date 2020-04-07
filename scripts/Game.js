var Game = (function () {
    /*
        32 cards button event handler
    */
    this.smallButtonHandler = function () {
        this.numberCard = 32;
        this.startButton.disabled = false;
    }

    /*
        52 cards button event handler
    */
    this.hugeButtonHandler = function () {
        this.numberCard = 52;   
        this.startButton.disabled = false;
        console.log(this.numberCard);
    }

    /*
        Start button event handler
    */
    this.startButtonHandler = function () {
        this.start();
        this.smallButton.disabled = true;
        this.hugeButton.disabled = true;
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
        this.player.hit(card);

        //render the card and score
        document.getElementById(this.player.element).innerHTML += card.view();
        this.playerScore.innerHTML = this.player.getScore();

        //if over, then player looses
        if (this.player.getScore() > 21) {
            this.gameEnded('You lost!');
        }
    }

    /*
        Stand button event handler
    */
    this.standButtonHandler = function () {
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        this.replayButton.disabled = true;

        //deals a card to the dealer until
        //one of the conditions below is true
        while (true) {
            var card = Deck.deck.pop();

            this.dealer.hit(card);
            document.getElementById(this.dealer.element).innerHTML += card.view();
            this.dealerScore.innerHTML = this.dealer.getScore();

            var playerBlackjack = this.player.getScore() == 21,
                dealerBlackjack = this.dealer.getScore() == 21;

            //Rule set
            if (dealerBlackjack && !playerBlackjack) {
                this.gameEnded('You lost!');
                break;
            } else if (dealerBlackjack && playerBlackjack) {
                this.gameEnded('Draw!');
                break;
            } else if (this.dealer.getScore() > 21 && this.player.getScore() <= 21) {
                this.gameEnded('You won!');
                break;
            } else if (this.dealer.getScore() > this.player.getScore() && this.dealer.getScore() <= 21 && this.player.getScore() < 21) {
                this.gameEnded('You lost!');
                break;
            }
            //TODO needs to be expanded..

        }
    }
    /*
        Initialise
    */
    this.init = function () {
        this.dealerScore = document.getElementById('dealer-score').getElementsByTagName("span")[0];
        this.playerScore = document.getElementById('player-score').getElementsByTagName("span")[0];
        this.playerProbability = document.getElementById('player-probability').getElementsByTagName("span")[0];
        this.smallButton = document.getElementById('small');
        this.hugeButton = document.getElementById('huge');
        this.startButton = document.getElementById('start');
        this.hitButton = document.getElementById('hit');
        this.standButton = document.getElementById('stand');
        this.replayButton = document.getElementById('replay');


        //attaching event handlers
        
        this.smallButton.addEventListener('click', this.smallButtonHandler.bind(this));
        this.hugeButton.addEventListener('click', this.hugeButtonHandler.bind(this));
        this.startButton.addEventListener('click', this.startButtonHandler.bind(this));
        this.hitButton.addEventListener('click', this.hitButtonHandler.bind(this));
        this.standButton.addEventListener('click', this.standButtonHandler.bind(this));
        this.replayButton.addEventListener('click', this.startButtonHandler.bind(this));

    }

    function bernoulli(p) {
        var t = Math.random();
        if (t < p){
            // success
            return true;
        }
        // failure
        return false;
    }
        
    function bernoulliApplication(p){
        if (bernoulli(p) == true){
            if(this.numberCard = 32) {
                Deck.initSmall();
            }
            else {
                Deck.init();
            }
        }
        else {
            if(this.numberCard = 32) {
                Deck.initInequallySmall();
            }
            else {            
                Deck.initInequally();
            }
        }
    }


    /*
        Start the game
    */
    this.start = function () {

        //initilaise and shuffle the deck of cards
        bernoulliApplication(Math.random());
        Deck.shuffle();
        //deal one card to dealer
        this.dealer = new Player('dealer', [Deck.deck.pop()]);
        //deal two cards to player
        this.player = new Player('player', [Deck.deck.pop(), Deck.deck.pop()]);

        if(this.numberCard == 52) {
            console.log("put");
            this.playerProbability.innerHTML = ((combination(4,1) * combination(16,1)) /  combination(52,2)).toFixed(5);
        }
        else if (this.numberCard == 32) {
            console.log("oui");
            this.playerProbability.innerHTML = ((combination(4,1) * combination(16,1)) /  combination(32,2)).toFixed(5);
        }

        //render the cards
        document.getElementById(this.dealer.element).innerHTML = this.dealer.showHand();
        document.getElementById(this.player.element).innerHTML = this.player.showHand();

        //renders the current scores
        this.dealerScore.innerHTML = this.dealer.getScore();
        this.playerScore.innerHTML = this.player.getScore();
        
        this.setMessage("Hit or Stand");
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