// ------ Approach #1 ------ //

const sum_pairs = (ints, s) => {
    let response
    let indexOfSolution = null

    for (let i = 0; i < ints.length; i++) {
        const current = ints[i]
        let j = i + 1

        while (j < ints.length) {
            const next = ints[j]
            if (current + next === s && (indexOfSolution === null || indexOfSolution > j)) {
                indexOfSolution = j
                response = [current, next]
            }
            j++
        }
    }
    return response
}

// ------ Approach #2 ------ //

const sum_pairs = (ints, s) => {
    let response
    let indexOfSolution = null

    for (let i = 0; i < ints.length; i++) {
        const current = ints[i]

        for (let j = i + 1; j < ints.length; j++) {
            const next = ints[j]
            if (current + next === s && (indexOfSolution === null || indexOfSolution > j)) {
                indexOfSolution = j
                response = [current, next]
            }
        }
    }
    return response
}

// ------ Approach #3 ------ // ✓

const sum_pairs = (ints, s) => {
    if (ints.length < 2) return undefined

    const map = new Set()
    map.add(ints[0])

    for (let i = 1; i < ints.length; ++i) {
        const current = ints[i]
        const diff = s - current
        if (map.has(diff)) {
            return [diff, current]
        }
        map.add(current)
    }

    return undefined
}


