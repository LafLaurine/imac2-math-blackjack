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
        numberCardHand = this.player.hand.length;
        if(this.inequal == false) {
            this.playerProbability.innerHTML = ((combination(4,1) * combination(16,1)) /  combination((this.numberCard)-numberCardHand,numberCardHand)).toFixed(5);
            //proba blackjack = just to have an AS
            if(player.hand.length == 10) {
                this.playerProbability.innerHTML = ((combination(4,1)) /  combination((this.numberCard)-numberCardHand,numberCardHand)).toFixed(5);
            }
        }
        else if (this.inequal == true){
            this.playerProbability.innerHTML = ((combination(12,1) * combination(20,1)) /  combination((this.numberCard)-numberCardHand,numberCardHand)).toFixed(5);
            //proba blackjack = just to have an AS
            if(player.hand.length == 10) {
                this.playerProbability.innerHTML = ((combination(12,1)) /  combination((this.numberCard)-numberCardHand,numberCardHand)).toFixed(5);
            }
        }
        

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
        while (true) {
            var card = Deck.deck.pop();
            
            if (this.dealer.getScore() <= 16) {
                this.dealer.hit(card);
            }
            else {
                this.dealer.stand();
            }
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
            if(parseInt(this.value) <= parseInt(document.getElementById('player-money').getElementsByTagName("span")[0].textContent)) {
                this.stake = this.value;
                document.getElementById('start').disabled = false;
            }
            else if ( parseInt(this.value) == 0){
                console.log("Cannot have value equal 0");
                document.getElementById('start').disabled = true;
            }
            else {
                console.log("Cannot have value superior");
                document.getElementById('start').disabled = true;
            }
        };
        this.playerProbability = document.getElementById('player-probability').getElementsByTagName("span")[0];
        this.goodHandProbability = document.getElementById('goodHand-probability').getElementsByTagName("span")[0];
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
            this.inequal = false;
            if(this.numberCard == 32) {
                Deck.initSmall();
            }
            else if(this.numberCard == 52) {
                Deck.init();
            }
        }
        else {
            console.log("Deck is inequal")
            this.inequal = true;
            if(this.numberCard = 32) {
                Deck.initInequallySmall();
            }
            else if(this.numberCard == 52) {            
                Deck.initInequally();
            }
        }
    }


    /*
        Start the game
    */
    this.start = function () {

        let counter = 0;
        let inequal = false;
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
        const hand21Probability = ((combination(4,1) * combination(16,1)) /  combination(this.numberCard,2)).toFixed(5);
        if(inequal === false) {
            this.playerProbability.innerHTML = hand21Probability;
        }

        else if (inequal === true) {
            this.playerProbability.innerHTML = ((combination(12,1) * combination(20,1)) /  combination(this.numberCard,2)).toFixed(5);
        }

        //good hand probability compute
        const hand20Probability = ((combination(4,1) * combination(4,1) + combination(16,2)) /  combination(this.numberCard,2)).toFixed(5);
        const hand19Probability = ((combination(4,1) * combination(4,1) + combination(16,1) * combination(4,1)) /  combination(this.numberCard,2)).toFixed(5);
        const hand18Probability = ((combination(4,1) * combination(4,1) +  combination(16,1) * combination(4,1) + combination(4,2)) /  combination(this.numberCard,2)).toFixed(5);
        const goodHandProba = (hand21Probability * 100) + (hand20Probability * 100) + (hand19Probability * 100) + (hand18Probability * 100);
        this.goodHandProbability.innerHTML = goodHandProba;

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