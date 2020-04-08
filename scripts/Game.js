var Game = (function () {
    /*
        32 cards button event handler
    */
    this.smallButtonHandler = function () {
        this.numberCard = 32;
    }

    /*
        52 cards button event handler
    */
    this.hugeButtonHandler = function () {
        this.numberCard = 52;   
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
            this.playerMoney.innerHTML = this.playerMoney.textContent - this.playerStake.value;
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
        while (this.dealer.getScore() <= 17) {
            var card = Deck.deck.pop();

            this.dealer.hit(card);
            document.getElementById(this.dealer.element).innerHTML += card.view();
            this.dealerScore.innerHTML = this.dealer.getScore();

            var playerBlackjack = this.player.getScore() == 21,
                dealerBlackjack = this.dealer.getScore() == 21; 
            
            //Rule set
            if (dealerBlackjack && !playerBlackjack) {
                this.playerMoney.innerHTML = this.playerMoney.textContent - this.playerStake.value;
                this.gameEnded('You lost!');
                break;
            } else if (dealerBlackjack && playerBlackjack) {
                this.gameEnded('Draw!');
                break;
            } else if (!dealerBlackjack && playerBlackjack) {
                this.playerMoney.innerHTML = this.playerMoney.textContent + this.playerStake.value * 3;
                this.gameEnded('You won!');
                break;
            } else if (this.dealer.getScore() > 21 && this.player.getScore() <= 21) {7
                this.playerMoney.innerHTML = this.playerMoney.textContent + this.playerStake.value * 2;
                this.gameEnded('You won!');
                break;
            } else if (this.playerMoney.textContent == 0) {
                this.gameEnded('You loose!');
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
        this.playerMoney = document.getElementById('player-money').getElementsByTagName("span")[0];
        this.playerStake = document.getElementById('stake');
        playerStake.oninput = function() {
            if(parseInt(this.value) < parseInt(document.getElementById('player-money').getElementsByTagName("span")[0].textContent)) {
                this.stake = this.value;
                document.getElementById('start').disabled = false;
            }
            else {
                console.log("Cannot have value superior");
                document.getElementById('start').disabled = true;
            }
        };
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
        var esperance = p;
        var variance = p*(1-p);
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

        var counter = 0;
        var intervalId = null;
        function bip() {
            counter++;
            document.getElementById("timeBip").innerHTML = "Time : " + counter + " seconds";
        }
        intervalId = setInterval(bip, 1000);
        
        //initilaise and shuffle the deck of cards
        bernoulliApplication(Math.random());
        Deck.shuffle();
        //deal one card to dealer
        this.dealer = new Player('dealer', [Deck.deck.pop()]);
        //deal two cards to player
        this.player = new Player('player', [Deck.deck.pop(), Deck.deck.pop()]);

        if(this.numberCard == 52) {
            this.playerProbability.innerHTML = ((combination(4,1) * combination(16,1)) /  combination(52,2)).toFixed(5);
        }
        else if (this.numberCard == 32) {
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
        document.getElementById("timeBip").innerHTML = 0;
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