const eventTab = ["Due to the stock market spit, you only start with 50 coins...",
    "Wow! You're lucky a millionaire left you 1,000 coins.",
    "You seem nice, you can start with 500 coins."
]

bernouilliParameter = 0.5;

//n = eventTab.size()
//p : proba chosen

function bernoulli(p) {
    const t = Math.random(); // return a pseudo random number between [0,1]
    if (t < p) {
        // success, deck is equiprobable
        return true;
    }
    // failure, deck is inequal
    return false;
}

function binomialCoef(n, k) {
    if ((typeof n !== 'number') || (typeof k !== 'number'))
        return false;
    var coeff = 1;
    for (var x = n - k + 1; x <= n; x++) coeff *= x;
    for (x = 1; x <= k; x++) coeff /= x;
    return coeff;
}


function probaBinomiale(p, n, k) {
    nk = binomialCoef(n, k);
    proba = nk * Math.pow(p, k) * Math.pow((1 - p), n - k);
    return proba;
}

// Standard Normal distribution between 0 and 1 using Box-Muller transform 
// resamples the values if it's more than 3.6 standard deviations away (less than 0.02% chance).
function normalDistribution() {
    let u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return randn_bm(); // resample between 0 and 1
    return num;
}

function uniforme(a, b, c, d) {
    return ((d - c) / (b - a));
}

function factorial(k) {
    let i;
    let result = 1;
    if (k >= 0) {
        for (i = k; i > 1; i--) {
            result = result * i;
        }
        return result;
    }
    return 0; // erreur
}

//count nb of combinations
function countCombinations(k, n) {
    let z = k - n;
    return factorial(k) / (factorial(n) * factorial(z));
}

//compute combination
function combination(n, k) {
    const t = new Array(n); //n elements tab
    t[0] = 1;
    for (let i = 1; i <= n; i++) {
        t[i] = 1;
        for (let j = i - 1; j >= 1; j--)
            t[j] = t[j] + t[j - 1];
    }
    return t[k]; //return value
}

function hypergeometric(k, n, g, t) {
    return combination(g, k) * combination((t - g), (n - k)) / combination(t, n);
}

//Poisson
//cas limite de la loi binomiale pour lequel intervient le facteur temps 
// loi de probabilité discrète qui décrit le comportement du nombre d'événements se produisant dans un intervalle de temps fixé
// si ces événements se produisent avec une fréquence moyenne ou espérance connue et indépendamment du temps écoulé depuis l'événement précédent
//lambda fois l'événement en moyenne par delta T
//quelle est la proba de l'evt exactement k fois dans ce delta T ?
function poisson(k, lambda) {
    let A = Math.pow(lambda, k);
    let L = Math.exp(-lambda);
    return ((A * L) / factorial(k))
}


// calcul de la moyenne d'un tableau
function moyenne(data) {
    var sum = data.reduce(function (sum, value) {
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}

function ecartType(values) {
    var avg = moyenne(values);
    var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });
    var avgSquareDiff = moyenne(squareDiffs);
    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}


function ecartMoyen(data) {
    var elem = [];
    var b = data.length;
    var final;
    var avg = moyenne(data);
    for (i = 0; i < b; i++) {
        elem.push(Math.abs(data[i] - avg));
    }
    final = elem.reduce((f, g) => f + g, 0)
    return final / b;
}

function drawStatsBernouilli() {
    // Paramètre
    document.getElementById("param").getElementsByTagName("span")[0].innerHTML = bernouilliParameter;
    // Esperance
    document.getElementById("esperance").getElementsByTagName("span")[0].innerHTML = bernouilliParameter;
    // Variance
    document.getElementById("variance").getElementsByTagName("span")[0].innerHTML = bernouilliParameter * (1 - bernouilliParameter);
}