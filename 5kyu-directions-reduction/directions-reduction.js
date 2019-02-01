// --------- Approach #1 --------- // ✓

const NORTH = 'NORTH';
const SOUTH = 'SOUTH';
const EAST = 'EAST';
const WEST = 'WEST';

function dirReduc(arr) {
    let result = [];

    arr.forEach(dir => {
        switch (dir.toUpperCase()) {
            case NORTH:
                if (result[result.length - 1] === SOUTH) result.pop(SOUTH);
                else result.push(NORTH);
                break;
            case SOUTH:
                if (result[result.length - 1] === NORTH) result.pop(NORTH);
                else result.push(SOUTH);
                break;
            case WEST:
                if (result[result.length - 1] === EAST) result.pop(EAST);
                else result.push(WEST);
                break;
            case EAST:
                if (result[result.length - 1] === WEST) result.pop(WEST);
                else result.push(EAST);
                break;
        }
    });
    return result;
}

