// ------ Approach #1 ------ // ✓

const handler = {
    getPrototypeOf(target) {
        return Thing.prototype // For supporting instanceof
    },
    get(target, key, receiver) {
        switch (key) {
            case 'is_a':
            case 'is_not_a':
            case 'is_the':
            case 'can':
            case 'being_the':
            case 'and_the':
                target.cmd = key
                return target.proxy
            case 'has':
            case 'having':
            case 'with':
            case 'each':
                return target[key].bind(target)
            default:
                break
        }

        const cmd = target.cmd
        target.cmd = null

        switch (cmd) {
            case 'is_a':
                target['is_a_' + key] = true
                return target.proxy
            case 'is_not_a':
                target['is_a_' + key] = false
                return target.proxy
            case 'is_the':
            case 'being_the':
            case 'and_the':
                if (!target.cmdArgs) {
                    target.cmd = cmd
                    target.cmdArgs = [key]
                    return target.proxy
                } else {
                    const property = target.cmdArgs[0]
                    target.cmdArgs = null
                    target[property] = key
                    return target.proxy
                }
            case 'can':
                return function (did, fn) {
                    const hasDid = typeof did === 'string'
                    if (!hasDid) {
                        fn = did
                    }
                    target[key] = function () {
                        const nameBackup = global.name
                        global.name = target.name
                        const item = fn.apply(target, arguments)
                        global.name = nameBackup

                        if (hasDid) {
                            const list = target[did] || []
                            list.push(item)
                            target[did] = list
                        }
                        return item
                    }
                }
            case 'has':
            case 'having':
            case 'with':
                const n = target.cmdArgs[0]
                target.cmdArgs = null
                if (n === 1) {
                    target[key] = new Thing(key)
                } else {
                    target[key] = new Array(n)
                    for (let i = 0; i < n; i++) {
                        target[key][i] = new Thing(key.replace(/s$/, ''))
                    }
                }
                return target[key]
            default:
                break
        }

        return Reflect.get(target, key, receiver)
    }
}

// Support `each` method
Array.prototype.each = function (fn) {
    for (let i = 0; i < this.length; i++) {
        this[i].each(fn)
    }
}

const symbolProxy = Symbol('proxy')

class RealThing {
    constructor(name) {
        this.name = name
        this.proxy = new Proxy(this, handler)

        this.cmd = null
        this.cmdArgs = null
    }

    has(n) {
        return this.addCmd('has', [n])
    }

    having(n) {
        return this.addCmd('having', [n])
    }

    with(n) {
        return this.addCmd('with', [n])
    }

    each(fn) {
        global[symbolProxy] = this
        return fn(this)
    }

    addCmd(cmd, args) {
        this.cmd = cmd
        this.cmdArgs = args
        return this.proxy
    }
}

function Thing(name) {
    return new RealThing(name).proxy
}

function having(n) {
    const target = global[symbolProxy]
    target.having(n)
    return target.proxy
}

const being_the = new Proxy({}, {
    get(target, key, receiver) {
        target = global[symbolProxy]
        target.cmd = 'being_the'
        target.cmdArgs = [key]
        return target.proxy
    }
})
