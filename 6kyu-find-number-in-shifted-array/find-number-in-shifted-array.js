// --------- Approach #1 --------- //

function findIndexOf(arr, n, i, y) {
    i = arr.length;
    y = i - 1;
    while (i--) {
        if (n === arr[i]) return i;
        if (n === arr[y - i]) return y - i;
    }
    return i
}

// --------- Approach #2 --------- //

function indexOf(arr, n, i, y) {
    i = arr.length;
    y = i - 1;
    while (i--) {
        if (n === arr[i]) return i;
        if (n === arr[y - i]) return y - i;
    }
    return i
}

function findIndexOf(arr, n) {
    const length = arr.length;
    const half_length = Math.ceil(length / 2);
    const lSide = arr.slice(0, half_length);
    let res;

    res = indexOf(lSide, n);
    if (res > -1) return res;

    const rSide = arr.slice(half_length, length);
    res = indexOf(rSide, n);
    if (res === -1) {
        return res;
    } else {
        return res + lSide.length;
    }
}

// --------- Approach #3 --------- //  ✓

function findIndexOf(arr, n) {
    let min = 0, max = arr.length - 1;

    while (min <= max) {
        let mid = Math.floor((min + max) / 2);
        if (n === arr[mid]) {
            return mid;
        }

        if (arr[mid] <= arr[max]) {
            // if right is sorted and n is not in this chunk, we'll have to search left
            if (n < arr[mid] || n > arr[max]) {
                max = mid - 1;
            } else {
                min = mid + 1;
            }
        }
        if (arr[mid] >= arr[min]) {
            // if left is sorted and n is not in this chunk, we'll search right
            if (n > arr[mid] || n < arr[min]) {
                min = mid + 1;
            } else {
                max = mid - 1;
            }
        }
    }
    return -1;
}

