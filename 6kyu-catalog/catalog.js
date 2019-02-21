// --------- Approach #1 --------- //  ✓

const wordRegEx = (w) => new RegExp(`^.*\\b(${w})\\b.*$`, 'gm');
const findLines = (s, w) => s.match(wordRegEx(w)) ? s.match(wordRegEx(w)) : null;
const grabPrice = (s) => s.match(/<prx>(.*?)<\/prx>/g)
    ? s.match(/<prx>(.*?)<\/prx>/g)[0].replace(/<\/?prx>/g, '')
    : null;
const grabQty = (s) => s.match(/<qty>(.*?)<\/qty>/g)
    ? s.match(/<qty>(.*?)<\/qty>/g)[0].replace(/<\/?qty>/g, '')
    : null;
const grabName = (s) => s.match(/<name>(.*?)<\/name>/g)
    ? s.match(/<name>(.*?)<\/name>/g)[0].replace(/<\/?name>/g, '')
    : null;
const composeResultLine = (line) => {
    const price = grabPrice(line);
    const qty = grabQty(line);
    const name = grabName(line);

    return `${name} > prx: $${price} qty: ${qty}`;
};

function catalog(s, article) {
    const lines = findLines(s, article);

    if (!lines || lines.length === 0) return 'Nothing';
    if (lines.length === 1) {
        return composeResultLine(lines[0]);
    }

    let result = '';

    lines.forEach((line, idx) => {
        result += `${idx > 0 ? '\r\n' : ''}${composeResultLine(line)}`;

    });

    return result;
}
