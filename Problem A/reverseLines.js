const readline = require('readline-sync');

function reverseLines() {
    const insertNumberOfCasesPhrase = "Please insert the number of cases: ";
    const answer = readline.question(insertNumberOfCasesPhrase);
    const maybeNumberOfCases = parseInt(answer);
    const isValid = validateAnswer(maybeNumberOfCases);
    if (isValid) {
        const numberOfCases = maybeNumberOfCases;
        const phrases = [];
        for (var i = 0; i < numberOfCases; i++) {
            const phrase = readline.question();
            const parsedPhrase = parsePhrase(phrase);
            phrases.push(parsedPhrase);
        };
        const output = prepareOutput(numberOfCases, phrases)
        console.clear();
        return output;
    }
    return 'Please review the input and try again.'
}

function validateAnswer(maybeNumberOfCases) {
    return Number.isInteger(maybeNumberOfCases) && maybeNumberOfCases >= 0
}

function parsePhrase(phrase) {
    const words = phrase.split(' ');
    const separatedWords = [];
    words.forEach(word => {
        separatedWords.unshift(word);
    });
    const finalPhrase = separatedWords.join(' ');
    return finalPhrase;
};

function prepareOutput(numberOfCases, cases) {
    let output = '';
    for (var i = 1; i <= numberOfCases; i++) {
        output = output + `Case #${i}: ` + cases[i - 1] + '\n';
    };
    return output
};

console.log(reverseLines());