const Game = (function () {

    let deck;
    let binomialeParameterValue;
    let poissonParameterValue;
    let bernouilliParameterValue;
    let normaleParameterValue;
    let gamePlayed = 0;

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
        document.getElementById('stake').disabled = true;
    }

    /*
        Hit button event handler
    */
    this.hitButtonHandler = function () {
        //deal a card and add to player's hand
        let card = new Card();
        if (this.inequal === false) {
            card = deck.draw();
        } else if (this.inequal === true) {
            card = deck.drawInequal();
        }
        this.player.hit(card);
        //render the card and score
        document.getElementById(this.player.element).innerHTML += card.view();
        this.playerScore.innerHTML = this.player.getScore();
        this.bustProbability.innerHTML = (this.computeBust()).toFixed(2);
        if (this.inequal === false) {
            document.getElementById('obtainingCard').oninput = function () {
                document.getElementById('chosen-card').innerHTML = (obtainingCard(this.value).toFixed(2));
            }
            this.expectedValue.innerHTML = ((1 - this.playerProbability.innerHTML) * this.playerStake.value) - (this.playerProbability.innerHTML * (3 * this.playerStake.value)).toFixed(2);
            if (player.hand.length == 10) {
                this.playerProbability.innerHTML = ((combination(4, 1)) / combination((this.numberCard) - this.numberCardHand, this.numberCardHand)).toFixed(2);
                this.expectedValue.innerHTML = ((1 - this.playerProbability.innerHTML) * this.playerStake.value) - (this.playerProbability.innerHTML * (3 * this.playerStake.value)).toFixed(2);
            } else {
                this.playerProbability.innerHTML = 0
            }
        }
        else if (this.inequal === true){
            this.expectedValue.innerHTML = ((1 - this.playerProbability.innerHTML) * this.playerStake.value) - (this.playerProbability.innerHTML * (3 * this.playerStake.value)).toFixed(2);
            if (player.hand.length == 10) {
                if(Object.values(deck).rank === "A" && Object.values(deck).suit === "♡") {
                    this.playerProbability.innerHTML =  (3*(0.1 * 1/(this.numberCard - 1 - this.numberCardHand))).toFixed(2);
                } else {
                    this.playerProbability.innerHTML = (3*(0.01 * 90/(this.numberCard - 1 - this.numberCardHand))).toFixed(2);
                }
                this.expectedValue.innerHTML = ((1 - this.playerProbability.innerHTML) * this.playerStake.value) - (this.playerProbability.innerHTML * (3 * this.playerStake.value)).toFixed(2)
            } else {
                this.playerProbability.innerHTML = 0
            }
        }
        //if over, then player looses
        if (this.player.getScore() > 21) {
            this.playerMoney.innerHTML = this.playerMoney.textContent - this.playerStake.value;
            this.loose++;
            this.gameEnded('You lost!');
        }
    }

    function applyNormale() {
        return normalDistribution();
    }

    function drawStatsNormale() {
        // Paramètre
        document.getElementById("param").getElementsByTagName("span")[0].innerHTML = normaleParameterValue.innerHTML;
        // Esperance
        document.getElementById("esperance").getElementsByTagName("span")[0].innerHTML = 0;
        // Variance 
        document.getElementById("variance").getElementsByTagName("span")[0].innerHTML = 1;
    }

    /*
        Stand button event handler
    */
    this.standButtonHandler = function () {
        this.hitButton.disabled = true;
        this.standButton.disabled = true;

        //deals a card to the dealer until
        //one of the conditions below is true
        let card = new Card();
        let t = applyNormale();
        let limit;
        if (localStorage.getItem('difficulty') === 'easy') {
            if (t > normaleParameterValue.innerHTML) {
                limit = 20;
            } else {
                limit = Math.floor(Math.random() * 20) + 16;
            }
        } else if (localStorage.getItem('difficulty') === 'normal') {
            if (t > normaleParameterValue.innerHTML) {
                limit = 17;
            } else {
                limit = Math.floor(Math.random() * 17) + 14;
            }
        } else if (localStorage.getItem('difficulty') === 'hard') {
            if (t > normaleParameterValue.innerHTML) {
                limit = 16;
            } else {
                limit = Math.floor(Math.random() * 17) + 16;
            }
        }
        while (this.dealer.getScore() < limit) {
            if (this.inequal === false) {
                card = deck.draw();
            } else if (this.inequal === true) {
                card = deck.drawInequal();
            }
            this.dealer.hit(card);
            document.getElementById(this.dealer.element).innerHTML += card.view();
            this.dealerScore.innerHTML = this.dealer.getScore();
        }
        const playerBlackjack = this.player.getScore() == 21,
            dealerBlackjack = this.dealer.getScore() == 21;

        //Rule set
        if (dealerBlackjack && !playerBlackjack) {
            this.playerMoney.innerHTML = parseInt(this.playerMoney.textContent) - parseInt(this.playerStake.value);
            this.loose++;
            this.winning = false;
            this.gameEnded('You lost!');
        } else if (dealerBlackjack && playerBlackjack) {
            this.loose++;
            this.winning = false;
            this.gameEnded('Draw!');
        } else if (!dealerBlackjack && playerBlackjack) {
            this.playerMoney.innerHTML = parseInt(this.playerMoney.textContent) + parseInt(this.playerStake.value * 2);
            this.win++;
            this.winning = true;
            this.gameEnded('You won !');
        } else if (this.dealer.getScore() > 21 && this.player.getScore() <= 21) {
            this.playerMoney.innerHTML = parseInt(this.playerMoney.textContent) + parseInt(this.playerStake.value * 2);
            this.win++;
            this.winning = true;
            this.gameEnded('You won!');
        } else if (this.dealer.getScore() < 21 && this.player.getScore() <= 21) {
            this.playerMoney.innerHTML = parseInt(this.playerMoney.textContent) + parseInt(this.playerStake.value * 2);
            this.win++;
            this.winning = true;
            this.gameEnded('You win !');
        } else if (this.dealer.getScore() > this.player.getScore() && this.dealer.getScore() <= 21 && this.player.getScore() < 21) {
            this.loose++;
            this.winning = false;
            this.gameEnded('You lost!');
        }
    }

    this.showGraph = function () {
        let factor;
        if (this.numberCard === 52) {
            factor = 169;
        } else {
            factor = 256;
        }
        if (this.showGraphButton.className === "green") {

            let canva = document.createElement('CANVAS');
            canva.id = "myChart";
            document.getElementsByClassName('element')[2].appendChild(canva);
            const ctx = canva.getContext('2d');
            new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',
                // The data for our dataset
                data: {
                    labels: ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
                    datasets: [{
                        label: 'Card distribution data ' + '* ' + factor,
                        backgroundColor: 'rgb(99, 203, 255)',
                        borderColor: 'rgb(99, 203, 255)',
                        data: [1, 2, 3, 4, 5, 6, 7, 8, 15, 16, 15, 14, 13, 12, 11, 10, 18, 8, 1]
                    }]
                },

                // Configuration options go here
                options: {}
            });
            this.showGraphButton.classList.remove("green");
            this.showGraphButton.classList.add("red");
        } else {
            document.getElementById("myChart").remove();
            this.showGraphButton.classList.remove("red");
            this.showGraphButton.classList.add("green");
        }
    }

    /*
        Initialise
    */
    this.init = function () {
        this.win = 0;
        this.winning = false;
        this.loose = 0;
        this.dealerScore = document.getElementById('dealer-score').getElementsByTagName("span")[0];
        this.playerScore = document.getElementById('player-score').getElementsByTagName("span")[0];
        this.playerMoney = document.getElementById('player-money').getElementsByTagName("span")[0];
        this.playerStake = document.getElementById('stake');

        playerStake.oninput = function () {
            if (parseInt(this.value) <= parseInt(document.getElementById('player-money').getElementsByTagName("span")[0].textContent)) {
                this.stake = this.value;
                document.getElementById('scoreInfo').innerHTML = '';
                document.getElementById('start').disabled = false;
            } else if (parseInt(this.value) === 0) {
                document.getElementById('scoreInfo').innerHTML = 'Your stake cannot be 0';
                document.getElementById('start').disabled = true;
            } else {
                document.getElementById('scoreInfo').innerHTML = 'You don\'t have enough money';
                document.getElementById('start').disabled = true;
            }
        };

        //Store important elements
        this.playerProbability = document.getElementById('player-probability').getElementsByTagName("span")[0];
        this.bustProbability = document.getElementById('bust-probability').getElementsByTagName("span")[0];
        this.expectedValue = document.getElementById('expected-value').getElementsByTagName("span")[0];
        this.goodHandProbability = document.getElementById('goodHand-probability').getElementsByTagName("span")[0];
        this.smallButton = document.getElementById('small');
        this.hugeButton = document.getElementById('huge');
        this.startButton = document.getElementById('start');
        this.hitButton = document.getElementById('hit');
        this.standButton = document.getElementById('stand');
        this.showGraphButton = document.getElementById('showGraphButton');

        //Attaching event handlers        
        this.smallButton.addEventListener('click', this.smallButtonHandler.bind(this));
        this.hugeButton.addEventListener('click', this.hugeButtonHandler.bind(this));
        this.startButton.addEventListener('click', this.startButtonHandler.bind(this));
        this.hitButton.addEventListener('click', this.hitButtonHandler.bind(this));
        this.standButton.addEventListener('click', this.standButtonHandler.bind(this));
        this.showGraphButton.addEventListener('click', this.showGraph.bind(this));

        let bernouilliInput = document.querySelector('#bernouilliInput');
        bernouilliParameterValue = document.querySelector('.bernouilliParameterValue');

        bernouilliParameterValue.innerHTML = bernouilliInput.value;
        bernouilliChangeStats(bernouilliInput.value);

        bernouilliInput.addEventListener('input', function () {
            bernouilliParameterValue.innerHTML = bernouilliInput.value;
            bernouilliChangeStats(bernouilliInput.value);
        }, false);

        let binomialeInput = document.querySelector('#binomialeInput');
        binomialeParameterValue = document.querySelector('.binomialeParameterValue');

        binomialeParameterValue.innerHTML = binomialeInput.value;
        binomialeChangeStats(binomialeInput.value);

        binomialeInput.addEventListener('input', function () {
            binomialeParameterValue.innerHTML = binomialeInput.value;
            binomialeChangeStats(binomialeInput.value);
        }, false);

        let poissonInput = document.querySelector('#poissonInput');
        poissonParameterValue = document.querySelector('.poissonParameterValue');

        poissonParameterValue.innerHTML = poissonInput.value;
        poissonChangeStats(poissonInput.value);

        poissonInput.addEventListener('input', function () {
            poissonParameterValue.innerHTML = poissonInput.value;
            poissonChangeStats(poissonInput.value);
        }, false);

        let normaleInput = document.querySelector('#normaleInput');
        normaleParameterValue = document.querySelector('.normaleParameterValue');

        normaleParameterValue.innerHTML = normaleInput.value;
        normaleChangeStats(normaleInput.value);

        normaleInput.addEventListener('input', function () {
            normaleParameterValue.innerHTML = normaleInput.value;
            normaleChangeStats(normaleInput.value);
        }, false);

    }

    function countCard(x) {
        let count = 0
        for (let i = 0; i < this.player.hand.length; i++) {
            if (x === this.player.hand[i].rank) {
                count++;
            }
        }
        for (let i = 0; i < this.dealer.hand.length; i++) {
            if (x === this.dealer.hand[i].rank) {
                count++;
            }
        }
        return count;
    }

    //proba of obtaining card value X
    function obtainingCard(x) {
        let nx = countCard(x)
        if (x === 'A' || x === '2' || x === '3' || x === '4' || x === '5' || x === '6' || x === '7' || x === '8' || x === '9' || x === '10' || x === 'J' || x === 'Q' || x === 'K') {
            if (x !== 10) {
                    return ((4 - nx) / (this.numberCard - (this.numberCardHand + this.numberCardDealer)))
            }
            else {
                return ((16 - nx) / (this.numberCard - (this.numberCardHand + this.numberCardDealer)))
            }
        } else {
            console.log("Card doesn't exist");
        }
    }

    this.computeBust = function () {
        let nbUnknownCard = this.numberCard - this.numberCardHand
        let count = 0
        //limit is a card the player must draw in order to not bust
        let limit = 21 - this.player.getScore()
        let cards = []
        for (let i = 0; i < this.player.hand.length; i++) {
            cards.push(this.player.hand[i].rank)
        }
        for (let i = 0; i < deck.length; i++) {
            if (deck[i].getValue() >= limit) {
                count++;
            }
        }
        return count / nbUnknownCard;
    }

    function bernoulliApplication(p) {
        if (bernoulli(p) === true) {
            this.inequal = false;
            if (this.numberCard === 32) {
                deck.initSmall();
            } else if (this.numberCard == 52) {
                deck.initEqual();
            }
        } else {
            this.inequal = true;
            if (this.numberCard === 32) {
                deck.initSmallInequal();

            } else if (this.numberCard === 52) {
                deck.initInequal();
            }
        }
    }

    function drawStatsBernouilli() {
        // Paramètre
        document.getElementById("param").getElementsByTagName("span")[0].innerHTML = bernouilliParameterValue.innerHTML;
        // Esperance
        document.getElementById("esperance").getElementsByTagName("span")[0].innerHTML = bernouilliParameterValue.innerHTML;
        // Variance
        document.getElementById("variance").getElementsByTagName("span")[0].innerHTML = (bernouilliParameterValue.innerHTML * (1 - bernouilliParameterValue.innerHTML)).toFixed(2);
    }

    function bernouilliChangeStats(bernouilliVariable) {
        bernoulliApplication(bernouilliVariable);
        drawStatsBernouilli();
    }

    function binomialeApplication(binomialeVariable) {
        document.getElementById('player-money').getElementsByTagName("span")[0].innerHTML = 500;
        let b = binomiale(binomialeVariable, Object.keys(eventTab).length, 1);
        if ((Math.floor(b * 10) >= 0) && Math.floor(b * 10) <= 2) {
            this.playerMoney.innerHTML = Object.values(eventTab)[Math.floor(b * 10)];
            document.getElementById('player-money-message').getElementsByTagName("span")[0].innerHTML = Object.keys(eventTab)[Math.floor(b * 10)];
        }
    }

    function binomialeChangeStats(binomialeVariable) {
        binomialeApplication(binomialeVariable)
        drawStatsBinomiale();
    }

    function drawStatsBinomiale() {
        let esperance = (binomialeInput.value * Object.keys(eventTab).length).toFixed(2);
        let variance = (Object.keys(eventTab).length * binomialeInput.value * (1 - binomialeInput.value)).toFixed(2);
        // param
        document.getElementById("param").getElementsByTagName("span")[0].innerHTML = binomialeParameterValue.innerHTML;
        // Esperance
        document.getElementById("esperance").getElementsByTagName("span")[0].innerHTML = esperance;
        // Variance
        document.getElementById("variance").getElementsByTagName("span")[0].innerHTML = variance;
    }

    function poissonChangeStats(maxGame) {
        applyPoisson(maxGame)
        drawStatsPoisson();
    }

    function drawStatsPoisson() {
        // param
        document.getElementById("param").getElementsByTagName("span")[0].innerHTML = poissonParameterValue.innerHTML;
        // Esperance
        document.getElementById("esperance").getElementsByTagName("span")[0].innerHTML = (poissonParameterValue.innerHTML / 3).toFixed(2);
        // Variance
        document.getElementById("variance").getElementsByTagName("span")[0].innerHTML = (poissonParameterValue.innerHTML / 3).toFixed(2);
    }

    function chooseMartingale() {
        if (uniforme(0, 3, 0, 1) > 0 && uniforme(0, 3, 0, 1) <= 0.3) {
            applyMartingale("Alembert");
        } else if (uniforme(0, 2, 0, 1) > 0.3 && uniforme(0, 2, 0, 1) <= 0.5) {
            applyMartingale("Contre Alembert");
        } else {
            applyMartingale("Paroli");
        }
    }

    function applyMartingale(str) {
        let unit;
        if (parseInt(this.playerStake.value) < 100) {
            unit = 10;
        } else {
            unit = 100;
        }
        if (str === "Alembert") {
            if (winning) {
                if (parseInt(this.playerStake.value) - unit > 0)
                    this.playerStake.value = parseInt(this.playerStake.value) - unit;
            } else
                this.playerStake.value = parseInt(this.playerStake.value) + unit;
        } else if (str === "Contre Alembert") {
            if (winning)
                this.playerStake.value = parseInt(this.playerStake.value) + unit;
            else {
                if (parseInt(this.playerStake.value) - unit > 0) {
                    this.playerStake.value = parseInt(this.playerStake.value) - unit;
                }
            }
        } else if (str === "Paroli") {
            let firstStake = parseInt(this.playerStake.value);
            if (winning)
                this.playerStake.value = parseInt(this.playerStake.value) * 2;
            //here we simulate a paroli of 2 (continue with the start stake if we won 4 times)
            if (this.win === 4) {
                this.playerStake.value = firstStake;
            }
        }
    }

    function applyPoisson(maxGame) {
        if (poisson(gamePlayed, maxGame) >= 0.2) {
            localStorage.setItem('difficulty', 'normal');
        }
        else if (poisson(gamePlayed, maxGame) >= 0.4) {
            localStorage.setItem('difficulty', 'hard');
        }
    }

    function computeVariance() {
        return 1.15 * Math.sqrt(gamePlayed);
    }

    function normaleChangeStats() {
        applyNormale()
        drawStatsNormale();
    }

    /*
        Start the game
    */
    this.start = function () {
        let inequal = false;
        deck = new Deck();
        //initilaise deck of cards
        bernouilliParameter = 0.5;
        bernoulliApplication(bernouilliParameter);
        deck.shuffle();
        //deal one card to dealer
        this.dealer = new Player('dealer', [deck.draw()]);
        //deal two cards to player
        this.player = new Player('player', [deck.draw(), deck.draw()]);
        this.numberCardHand = this.player.hand.length;
        gamePlayed += 1;
        this.numberCardDealer = this.dealer.hand.length;
        let hand21Probability = ((combination(4, 1) * combination(16, 1)) / combination(this.numberCard, 2)).toFixed(2);
        // We have 4 cases
        //AS♥ + head
        let case1 = 16*(0.1 * 1/(this.numberCard - 1));
        //As + head
        let case2 = (90/(this.numberCard - 1)) * (1/100) * 3 * 16 * (90/(this.numberCard - 2) * 1/100);
        // head + As♥
        let case3 = ((90/(this.numberCard - 1) * 1/100) * 0.1) * 16;
        // head + AS
        let case4 = 16 * (90/(this.numberCard - 1) * 0.01) * (3 * (90/(this.numberCard -2) * 0.01));  
        let hand21InequalProbability = (case1 + case2 + case3 + case4).toFixed(2);
        if (this.inequal === false) {
            this.playerProbability.innerHTML = hand21Probability;
            this.expectedValue.innerHTML = (((1 - hand21Probability) * this.playerStake.value) - (hand21Probability * (3 * this.playerStake.value))).toFixed(2)
        }
        else if (this.inequal === true) {
            this.playerProbability.innerHTML = hand21InequalProbability;
            this.expectedValue.innerHTML = (((1 - hand21InequalProbability) * this.playerStake.value) - (hand21InequalProbability * (3 * this.playerStake.value))).toFixed(2)
        }

        let goodHandProba;
        let hand20Probability;
        let hand19Probability;
        let hand18Probability;

        //good hand probability compute
        if(this.inequal === false) {
            hand20Probability = ((combination(4, 1) * combination(4, 1) + combination(16, 2)) / combination(this.numberCard, 2)).toFixed(2);
            hand19Probability = ((combination(4, 1) * combination(4, 1) + combination(16, 1) * combination(4, 1)) / combination(this.numberCard, 2)).toFixed(2);
            hand18Probability = ((combination(4, 1) * combination(4, 1) + combination(16, 1) * combination(4, 1) + combination(4, 2)) / combination(this.numberCard, 2)).toFixed(2);
            goodHandProba = (hand21Probability * 100) + (hand20Probability * 100) + (hand19Probability * 100) + (hand18Probability * 100);
        } else if (this.inequal === true){
            hand20Probability = (0.1 * (1/(this.numberCard - 1)) * 4) + ((90 / (this.numberCard - 1) * 0.01) * (90/(this.numberCard - 2) * 0.01)) * 2 + (0.01 * (90/(this.numberCard - 1)) * 4 * 0.1) + (((90/(this.numberCard - 1)) * 0.01 * 4) * (3 * (90/(this.numberCard -2) * 0.01)));
            hand19Probability = ((16 * (90/(this.numberCard - 1) * 0.01)) * 4 * (90/(this.numberCard - 2) * 0.01)) * 2 + (0.1 * (1 / (this.numberCard - 1) * 4)) + ((90/(this.numberCard-1) * 0.01) * 4 * 0.1) + ((90/(this.numberCard - 1) * 0.01) * 3 * 4 * ((90/this.numberCard - 2) * 0.01)) * 2;
            hand18Probability = (((90/(this.numberCard - 1)) * 0.01) * 16 * 4 * (90/(this.numberCard - 2) * 0.01)) * 2 + (0.1 * (1 / (this.numberCard - 1) * 4)) + ((90/(this.numberCard - 1) * 0.01) * 4 * 0.1) + (90/(this.numberCard - 1) * 0.01 * 3 * 4 * (90/(this.numberCard - 2) * 0.01)) * 2 + ((90/(this.numberCard - 1) * 0.01) * 4 * (90/(this.numberCard - 2) * 0.01) * 4) * 2;
            goodHandProba = (hand21Probability * 100) + (hand20Probability * 100) + (hand19Probability * 100) + (hand18Probability * 100);
        }

        this.goodHandProbability.innerHTML = goodHandProba;

        //render the cards
        document.getElementById(this.dealer.element).innerHTML = this.dealer.showHand();
        document.getElementById(this.player.element).innerHTML = this.player.showHand();

        //renders the current scores
        this.dealerScore.innerHTML = this.dealer.getScore();
        this.playerScore.innerHTML = this.player.getScore();
        this.cardProbability = document.getElementById('obtainingCard');

        cardProbability.oninput = function () {
            document.getElementById('chosen-card').innerHTML = (obtainingCard(this.value).toFixed(2))
        }
        this.bustProbability.innerHTML = (this.computeBust()).toFixed(2)
        this.setMessage("Hit or Stand");

        if (this.playerMoney.textContent == 0) {
            this.loose++;
            this.gameEnded('You loose!');
        }
        document.querySelector('#bernouilliInput').disabled = true;
        document.querySelector('#binomialeInput').disabled = true;
        let bjVarianceText = document.getElementById('bjVariance').getElementsByTagName("span")[0];
        bjVarianceText.innerHTML = Math.floor((Math.log(0.02) / 2 * 25) * -(computeVariance() * computeVariance()));
    }

    /*
        If the player wins or looses
    */
    this.gameEnded = function (str) {
        if (this.playerMoney.textContent === 0 || this.playerMoney.textContent < 0) {
            alert("You got no money");
            window.location.href = '../index.html';
        }
        this.setMessage(str);
        this.startButton.disabled = false;
        this.hitButton.disabled = true;
        this.standButton.disabled = true;
        document.getElementById("win").getElementsByTagName("span")[0].innerHTML = this.win;
        document.getElementById("loose").getElementsByTagName("span")[0].innerHTML = this.loose;
        chooseMartingale();
        this.playerStake.innerHTML = this.playerStake;
        applyPoisson();
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