const eventTab = {
    "Due to the stock market spit, you only start with 50 coins...": 50,
    "Wow! You're lucky : a millionaire left you 1,000 coins.": 1000,
    "You seem nice, you can start with 500 coins.": 500,
    "Welcome to the jungle with 10000 coins.": 10000
}

function bernoulli(p) {
    const t = Math.random(); // return a pseudo random number between [0,1]
    if (t < p) {
        // success, deck is equiprobable
        return true;
    }
    // failure, deck is inequal
    return false;
}


//p = success proba
//n = nb experience
// k = success
function binomiale(p, n, k) {
    nk = combination(n, k);
    return nk * Math.pow(p, k) * Math.pow((1 - p), n - k);
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

function poisson(k, lambda) {
    let A = Math.pow(lambda, k);
    let L = Math.exp(-lambda);
    return ((A * L) / factorial(k))
}