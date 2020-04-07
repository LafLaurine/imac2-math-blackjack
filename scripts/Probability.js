function factorial(k) {
    let i;
    let result=1;
    if (k >= 0) {
        for(i=k;i>1;i--) {
            result = result*i;
        }
        return result;
    }
    return 0; // erreur
}
   
//count nb of combinations
function countCombinations(k,n) {
    let z = k-n;
    return factorial(k)/(factorial(n)*factorial(z));
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