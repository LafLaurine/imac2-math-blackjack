function bernoulli(p) {
    let t = Math.random();
    let esperance = p;
    let letiance = p * (1 - p);
    if (t < p) {
        // success
        return true;
    }
    // failure
    return false;
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
    t = new Array(n); //n elements tab
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
// si ces événements se produisent avec une fréquence moyenne ou espérance connue, et indépendamment du temps écoulé depuis l'événement précédent
//lambda fois l'événement en moyenne par delta T
//quelle est la proba de l'evt exactement k fois dans ce delta T ?
function poisson(k, lambda) {
    let A = Math.pow(lambda, k);
    let L = Math.exp(-lambda);
    return ((A * L) / factorial(k))
}