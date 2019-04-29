// --------- Approach #1 --------- //  ✓
function topThreeWords(text) {
    const wordsArray = text.split(' ');
    const counter = {};

    for (let i = 0; i < wordsArray.length; i++) {
        const currentWord = wordsArray[i]
            .replace(/[^\w\s'!]+/, '')
            .toLowerCase();
        let count = counter[currentWord];

        if (currentWord.match(/[a-z]+/i)
            && !currentWord.match(/[^\w\s'!]/)) {
            counter[currentWord] = count !== undefined ? ++count : 1;
        }
    }

    let result = [];
    const mappedResults = {};
    for (const word in counter) {
        const count = counter[word];
        mappedResults[count] = mappedResults[count]
            ? Array.from(new Set([...mappedResults[count], word].sort()))
            : [word];
    }

    Object.keys(mappedResults)
        .sort((a, b) => b - a)
        .splice(0, 3)
        .forEach((count) => {
            result = [...result, ...mappedResults[count]];
        });

    return result.splice(0, 3);
}
