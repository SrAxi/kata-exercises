// ------ Approach #1 ------ //  ✓

function duplicateOrUnique(array) {
    let maxValue = -Infinity;
    let arrSum = 0;
    const arrLength = array.length;
    let elem;
    for (let i = 0; i < arrLength; i++) {
        elem = array[i];
        if (elem > maxValue) {
            maxValue = elem
        }
        arrSum += elem
    }
    let expectedSum = maxValue * (maxValue + 1) / 2;
    if (maxValue > ((arrLength + 2) / 2)) {
        return arrSum - expectedSum
    }
    return Math.abs(arrSum - expectedSum * 2)
}

// ------ Approach #2 ------ //

const mapper = (arr) => {
    let map = new Map();
    for (let i = 0; i < arr.length; i++) {
        let count = map.get(arr[i]);
        if (count === undefined) map.set(arr[i], 1);
        else map.set(arr[i], count + 1);
    }

    return map;
};

function duplicateOrUnique(arr) {
    const map = mapper(arr);

    let first = map.get(arr[0]);
    let second = map.get(arr[1]);
    let third = map.get(arr[2]);

    if (first !== second && first !== third) return arr[0];

    for (let [key, value] of map) {
        if (value !== first) return key;
    }
}


// ------ Approach #3 ------ //

const isDuplicated = (arr) => {
    const uniques = Array.from(new Set(arr));
    return (uniques.length + 1) === arr.length;
    //   const number = arr.length - 2;
    //   return arr.indexOf(number) !== -1;
};

const findDuplicated = (arr) => {
    const found = {};
    let y = 0;
    let z = arr.length - 1;
    let res;

    while (!res) {
        if (!found[arr[y]]) {
            found[arr[y]] = 1
        } else {
            res = arr[y];
        }
        if (!found[arr[z]]) {
            found[arr[z]] = 1
        } else {
            res = arr[z];
        }
        y++;
        z--;
    }
    return res;
};

const findUnique = (arr) => {
    const uniques = {};
    const duplicates = {};
    let y = 0;
    let z = arr.length - 1;
    let done = false;

    while (!done) {
        if (z < y) {
            done = true;
            break;
        }
        if (z === y) {
            done = true;
            if (uniques[arr[y]]) {
                duplicates[arr[y]] = 1;
                delete (uniques[arr[y]]);
            } else {
                uniques[arr[y]] = 1;
            }
            break;
        }
        if (uniques[arr[y]]) {
            duplicates[arr[y]] = 1;
            delete (uniques[arr[y]]);
        } else {
            uniques[arr[y]] = 1;
        }
        if (uniques[arr[z]]) {
            duplicates[arr[z]] = 1;
            delete (uniques[arr[z]]);
        } else {
            uniques[arr[z]] = 1;
        }
        y++;
        z--;
    }

    return +(Object.keys(uniques).pop());
};

function duplicateOrUnique(arr) {
    if (isDuplicated(arr)) {
        return findDuplicated(arr);
    } else {
        return findUnique(arr);
    }
}

// ------ Approach #4 ------ //

const isDuplicated = (arr) => {
    const uniques = [...new Set(arr)];
    return (uniques.length + 1) === arr.length;
};

const findDuplicated = (arr) => {
    let acc = [];
    for (let i = 0; i < arr.length; i++) {
        let el = arr[i];
        if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) {
            acc.push(el);
            break;
        }
    }
    return acc[0];
};

const findUnique = (arr) => {
    let res = 0;
    for (let i = 0; i < arr.length; i++) {
        let val = arr[i];
        if (arr.indexOf(val) === arr.lastIndexOf(val)) {
            res = val;
            break;
        }
    }
    return res;
};

function duplicateOrUnique(arr) {
    if (isDuplicated(arr)) {
        return findDuplicated(arr);
    } else {
        return findUnique(arr);
    }
}

// ------ Approach #5 ------ //

const mapper = (arr) => {
    let map = {};
    for (let i = 0; i < arr.length; i++) {
        let count = map[arr[i]];
        if (count === undefined) map = Object.assign({ [arr[i]]: 1 }, map);
        else map = Object.assign(map, { [arr[i]]: ++count });
    }

    return map;
};

function duplicateOrUnique(arr) {
    const map = mapper(arr);

    let first = map[arr[0]];
    let second = map[arr[1]];
    let third = map[arr[2]];

    if (first !== second && first !== third) return arr[0];

    for (const key in map) {
        if (map[key] !== first) return +key;
    }
}

