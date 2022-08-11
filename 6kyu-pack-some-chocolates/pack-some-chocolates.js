// ------ Approach #1 ------ //  ✓

function makeChocolates(small, big, goal) {
    const smallRange = [...Array(small + 1).keys()]
    const bigRange = [...Array(big + 1).keys()]
    let result = -1

    exit_loops:
        for (let s = 0; s < smallRange.length; s++) {
            for (let b = 0; b < bigRange.length; b++) {
                if (b * 5 + s * 2 === goal) {
                    result = s
                    break exit_loops
                }
            }
        }

    return result
}
