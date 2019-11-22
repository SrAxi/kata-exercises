// ------ Approach #1 ------ //  ✓

const number = n => (cb = false) => cb ? cb(n) : n

const plus = a => b => a + b
const minus = a => b => b - a
const times = a => b => Math.floor(a * b)
const dividedBy = a => b => Math.floor(b / a)

const zero = number(0)
const one = number(1)
const two = number(2)
const three = number(3)
const four = number(4)
const five = number(5)
const six = number(6)
const seven = number(7)
const eight = number(8)
const nine = number(9)

