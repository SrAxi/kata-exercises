// --------- Approach #1 --------- //  ✓

function money_value(s) {
    if (!s.match(/[0-9]/g)) return 0.0;

    const number = s.replace(/\s/g, '').replace(/\$/g, '');
    return Number(number);
}
