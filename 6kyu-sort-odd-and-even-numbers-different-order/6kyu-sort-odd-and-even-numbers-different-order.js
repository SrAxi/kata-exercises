// --------- Approach #1 --------- //  ✓

function sortArray(array) {
    if (!array.length) return array;

    const isEven = (x) => x % 2 === 0;

    let oddAscArr = [];
    let evenDescArr = [];
    let result = [];
    const indexMap = {};

    for (let i = 0; i < array.length; i++) {
        const current = array[i];

        if (isEven(current)) {
            evenDescArr.push(current);
            indexMap[i] = 1;
        } else {
            oddAscArr.push(current);
            indexMap[i] = 0;
        }
    }

    oddAscArr.sort((a, b) => a - b);
    evenDescArr.sort((a, b) => b - a);

    for (const idx in indexMap) {
        const isEven = Boolean(indexMap[idx]);

        result[idx] = isEven ? evenDescArr.shift() : oddAscArr.shift();
    }

    return result;
}
