function factorial(k) {
    var i;
    var result=1;
    if (k >= 0) {
        for(i=k;i>1;i--) {
            result = result*i;
        }
        return result;
    }
    return 0; // erreur
}
   
//donne nb combinaisons
function countCombinations(k,n) {
    var z = k-n;
    return factorial(k)/(factorial(n)*factorial(z));
}

//calcul combinaison
function combination(n, k) {
    t = new Array(n); //Tableau de n éléments
    t[0] = 1;
    for (var i = 1; i <= n; i++) {
        t[i] = 1;
        for (var j = i - 1; j >= 1; j--) //On part de le fin pour ne pas écraser les valeurs.
            t[j] = t[j] + t[j - 1]; //On fait les calculs nécessaires.
    }
    return t[k]; //On renvoie la valeur recherchée.
}