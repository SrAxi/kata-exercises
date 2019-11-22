// ------ Approach #1 ------ //  ✓

function tongues(code) {
    const vowels = ['a', 'i', 'y', 'e', 'o', 'u']
    const vowelsReversed = [...vowels].reverse()
    const consonants = ['b', 'k', 'x', 'z', 'n', 'h', 'd', 'c', 'w', 'g', 'p', 'v', 'j', 'q', 't', 's', 'r', 'l', 'm', 'f']
    const consonantsReversed = [...consonants].reverse()
    let response = ''

    const getLetter = (x, arr, revArr, diff) => {
        const idx = arr.indexOf(x) - diff
        if (idx >= 0) {
            return arr[idx]
        } else {
            return revArr[Math.abs(idx) - 1]
        }
    }
    const getVowel = x => getLetter(x, vowels, vowelsReversed, 3)
    const getConsonant = x => getLetter(x, consonants, consonantsReversed, 10)
    const isVowel = x => vowels.includes(x)
    const isConsonant = x => consonants.includes(x)
    const decript = (x) => {
        if (isVowel(x)) return getVowel(x)
        if (isConsonant(x)) return getConsonant(x)
        return x
    }

    for (let i = 0; i < code.length; i++) {
        const current = String(code[i]).toLowerCase()
        const isUpper = code[i] !== current
        response = response + (isUpper ? decript(current).toUpperCase() : decript(current))
    }

    return response
}
