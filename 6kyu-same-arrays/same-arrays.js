// --------- Approach #1 --------- //  ✓

function comp(array1, array2) {
    if (!array1 || !array2 || array1.length !== array2.length) return false;
    if (array1.length === 0 && array2.length === 0) return true;

    let arraysMatch = true;

    for (let i = 0; i < array1.length; i++) {
        const num = array1[i];
        const found = array2.find((n, i) => {
            if (n === Math.pow(num, 2)) {
                array2.splice(i, 1);
                return n;
            }
        });
        if (!found) {
            arraysMatch = false;
            break;
        }
    }

    return arraysMatch;
}
