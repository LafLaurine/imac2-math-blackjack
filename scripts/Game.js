const Game = (function () {
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
    }

    /*
        Hit button event handler
    */
    this.hitButtonHandler = function () {
        //deal a card and add to player's hand
        let card;
        if (this.inequal === false && this.numberCard === 52) {
            card = Deck.deck[Deck.getRandomCard()]
        } else if (this.inequal === true && this.numberCard === 52) {
            card = Deck.deck[Deck.getRandomCardInequal()]
        } else if (this.inequal === false && this.numberCard === 32) {
            card = Deck.deck[Deck.getRandomCard()]
        } else if (this.inequal === true && this.numberCard === 32) {
            card = Deck.deck[Deck.getRandomCardInequal()]
        }
        this.player.hit(card);

        //render the card and score
        document.getElementById(this.player.element).innerHTML += card.view();
        this.playerScore.innerHTML = this.player.getScore();
        this.bustProbability.innerHTML = (this.computeBust()).toFixed(2)
        if (this.inequal === false) {
            document.getElementById('obtainingCard').oninput = function () {
                document.getElementById('chosen-card').innerHTML = (obtainingCard(this.value).toFixed(2))
            }
            this.expectedValue.innerHTML = ((1 - this.playerProbability.innerHTML) * this.playerStake.value) - (this.playerProbability.innerHTML * (3 * this.playerStake.value)).toFixed(2)
            if (player.hand.length == 10) {
                this.playerProbability.innerHTML = ((combination(4, 1)) / combination((this.numberCard) - this.numberCardHand, this.numberCardHand)).toFixed(2)
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

    /*
        Stand button event handler
    */
    this.standButtonHandler = function () {
        this.hitButton.disabled = true;
        this.standButton.disabled = true;

        //deals a card to the dealer until
        //one of the conditions below is true
        while (true) {
            let card = Deck.deck.pop();
            if (localStorage.getItem('difficulty') === 'easy') {

                if (this.dealer.getScore() >= 14 && this.dealer.getScore() <= 17) {
                    let t = Math.random();
                    if (t > 7) {
                        this.dealer.hit(card);
                    }
                } else if (this.dealer.getScore() < 17) {
                    this.dealer.hit(card);
                }
            }

            if (localStorage.getItem('difficulty') === 'normal') {

                if (this.dealer.getScore() >= 14 && this.dealer.getScore() <= 17) {
                    let t = Math.random();
                    if (t > 5) {
                        this.dealer.hit(card);
                    }
                } else if (this.dealer.getScore() < 17) {
                    this.dealer.hit(card);
                }
            }

            if (localStorage.getItem('difficulty') === 'normal') {

                if (this.dealer.getScore() >= 14 && this.dealer.getScore() <= 17) {
                    let t = Math.random();
                    if (t > 4) {
                        this.dealer.hit(card);
                    }
                } else if (this.dealer.getScore() < 17) {
                    this.dealer.hit(card);
                }
            }

            document.getElementById(this.dealer.element).innerHTML += card.view();
            this.dealerScore.innerHTML = this.dealer.getScore();

            let playerBlackjack = this.player.getScore() == 21,
                dealerBlackjack = this.dealer.getScore() == 21;

            //Rule set
            if (dealerBlackjack && !playerBlackjack) {
                this.playerMoney.innerHTML = parseInt(this.playerMoney.textContent) - parseInt(this.playerStake.value);
                this.loose++;
                this.gameEnded('You lost!');
                break;
            } else if (dealerBlackjack && playerBlackjack) {
                this.loose++;
                this.gameEnded('Draw!');
                break;
            } else if (!dealerBlackjack && playerBlackjack) {
                this.playerMoney.innerHTML = parseInt(this.playerMoney.textContent) + parseInt(this.playerStake.value * 3);
                this.win++;
                this.gameEnded('You won!');
                break;
            } else if (this.dealer.getScore() > 21 && this.player.getScore() <= 21) {
                this.playerMoney.innerHTML = parseInt(this.playerMoney.textContent) + parseInt(this.playerStake.value * 2);
                this.win++;
                this.gameEnded('You won!');
                break;
            } else if (this.dealer.getScore() > this.player.getScore() && this.dealer.getScore() <= 21 && this.player.getScore() < 21) {
                this.loose++;
                this.gameEnded('You lost!');
                break;
            } else if (this.playerMoney.textContent == 0) {
                this.loose++;
                this.gameEnded('You loose!');
                break;
            }
        }
    }

    this.showGraph = function () {
        if (this.showGraphButton.className === "green") {
            const ctx = document.getElementById('myChart').getContext('2d');
            new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',
                // The data for our dataset
                data: {
                    labels: ['4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'],
                    datasets: [{
                        label: 'Card distribution',
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
        }
        else {
            document.getElementById("myChart").remove();
        }
    }

    /*
        Initialise
    */
    this.init = function () {
        this.win = 0;
        this.loose = 0;
        this.dealerScore = document.getElementById('dealer-score').getElementsByTagName("span")[0];
        this.playerScore = document.getElementById('player-score').getElementsByTagName("span")[0];
        this.playerMoney = document.getElementById('player-money').getElementsByTagName("span")[0];
        this.playerStake = document.getElementById('stake');

        playerStake.oninput = function () {
            if (parseInt(this.value) <= parseInt(document.getElementById('player-money').getElementsByTagName("span")[0].textContent)) {
                this.stake = this.value;
                document.getElementById('start').disabled = false;
            } else if (parseInt(this.value) == 0) {
                console.log("Cannot have value equal 0");
                document.getElementById('start').disabled = true;
            } else {
                console.log("Cannot have value superior");
                document.getElementById('start').disabled = true;
            }
        };
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

        //attaching event handlers        
        this.smallButton.addEventListener('click', this.smallButtonHandler.bind(this));
        this.hugeButton.addEventListener('click', this.hugeButtonHandler.bind(this));
        this.startButton.addEventListener('click', this.startButtonHandler.bind(this));
        this.hitButton.addEventListener('click', this.hitButtonHandler.bind(this));
        this.standButton.addEventListener('click', this.standButtonHandler.bind(this));

        if (this.showGraphButton.className === "green")
            this.showGraphButton.addEventListener('click', this.showGraph.bind(this));
        else
            this.showGraphButton.addEventListener('click', this.removeGraph.bind(this));
    }

    function bernoulliApplication(p) {
        if (bernoulli(p) == true) {
            this.inequal = false;
            if (this.numberCard == 32) {
                Deck.initSmall();
            } else if (this.numberCard == 52) {
                Deck.init();
            }
        } else {
            this.inequal = true;
            if (this.numberCard = 32) {
                Deck.initSmall();

            } else if (this.numberCard == 52) {
                Deck.init();

            }
        }
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
                if (this.inequal === false)
                    return ((4 - nx) / (this.numberCard - (this.numberCardHand + this.numberCardDealer)))
                else
                    return ((10 - nx) / (this.numberCard - (this.numberCardHand + this.numberCardDealer)))


            } else {
                if (this.inequal === false)
                    return ((16 - nx) / (this.numberCard - (this.numberCardHand + this.numberCardDealer)))
                else
                    return ((14 - nx) / (this.numberCard - (this.numberCardHand + this.numberCardDealer)))
            }
        } else {
            console.log("Card doesn't exist")
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
        for (let i = 0; i < Deck.deck.length; i++) {
            if (Deck.deck[i].getValue() >= limit) {
                count++;
            }
        }
        return count / nbUnknownCard;
    }


    /*
        Start the game
    */
    this.start = function () {
        let inequal = false;

        //initilaise deck of cards
        bernoulliApplication(Math.random());
        Deck.shuffle();

        //deal one card to dealer
        this.dealer = new Player('dealer', [Deck.deck.pop()]);
        //deal two cards to player
        this.player = new Player('player', [Deck.deck.pop(), Deck.deck.pop()]);
        this.numberCardHand = this.player.hand.length;
        this.numberCardDealer = this.dealer.hand.length;
        const hand21Probability = ((combination(4, 1) * combination(16, 1)) / combination(this.numberCard, 2)).toFixed(2);
        const hand21Inequal = ((combination(10, 1) * combination(14, 1)) / combination(this.numberCard, 2)).toFixed(2)
        if (inequal === false) {
            this.playerProbability.innerHTML = hand21Probability;
            this.expectedValue.innerHTML = ((1 - hand21Probability) * this.playerStake.value) - (hand21Probability * (3 * this.playerStake.value)).toFixed(2)
        } else if (inequal === true) {
            this.playerProbability.innerHTML = hand21Inequal;
            this.expectedValue.innerHTML = ((1 - hand21Inequal) * this.playerStake.value) - (hand21Inequal * (3 * this.playerStake.value)).toFixed(2)
        }

        //good hand probability compute
        const hand20Probability = ((combination(4, 1) * combination(4, 1) + combination(16, 2)) / combination(this.numberCard, 2)).toFixed(2);
        const hand19Probability = ((combination(4, 1) * combination(4, 1) + combination(16, 1) * combination(4, 1)) / combination(this.numberCard, 2)).toFixed(2);
        const hand18Probability = ((combination(4, 1) * combination(4, 1) + combination(16, 1) * combination(4, 1) + combination(4, 2)) / combination(this.numberCard, 2)).toFixed(2);
        const goodHandProba = (hand21Probability * 100) + (hand20Probability * 100) + (hand19Probability * 100) + (hand18Probability * 100);
        this.goodHandProbability.innerHTML = goodHandProba.toFixed(2);

        //render the cards
        document.getElementById(this.dealer.element).innerHTML = this.dealer.showHand();
        document.getElementById(this.player.element).innerHTML = this.player.showHand();

        //renders the current scores
        this.dealerScore.innerHTML = this.dealer.getScore();
        this.playerScore.innerHTML = this.player.getScore();

        this.cardProbability = document.getElementById('obtainingCard');

        cardProbability.oninput = function () {
            if (inequal === false) {
                document.getElementById('chosen-card').innerHTML = (obtainingCard(this.value).toFixed(2))
            } else {
                document.getElementById('chosen-card').innerHTML = (obtainingCard(this.value).toFixed(2))
            }
        }
        this.bustProbability.innerHTML = (this.computeBust()).toFixed(2)
        this.setMessage("Hit or Stand");
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