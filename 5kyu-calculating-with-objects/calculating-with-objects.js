// --------- Approach #1 --------- // ✓

Num.prototype[Symbol.toPrimitive] = function() {
    return this.num;
};
