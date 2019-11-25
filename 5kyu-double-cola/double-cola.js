// ------ Approach #1 ------ //

function whoIsNext(names, r) {
    const queue = [...names]
    for (let i = 1; i < r; i++) {
        const current = queue[0]
        queue.shift()
        queue.push(current)
        queue.push(current)
    }
    return queue[0]
}

// ------ Approach #2 ------ //

function whoIsNext(names, r) {
    if (r <= names.length) return names[r - 1]

    const diff = r - names.length

    const queue = [...names]
    for (let i = 1; i < diff + 1; i++) {
        const current = queue[i - 1]
        queue.push(...[current, current])
    }
    return queue[r - 1]
}

// ------ Approach #3 ------ // ✓

function whoIsNext(names, r) {
    r = r - 1

    while (r >= names.length) {
        r = Math.floor((r - names.length) / 2)
    }
    return names[r]
}