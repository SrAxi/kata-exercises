// ------ Approach #1 ------ //  ✓

const grabNumber = (s) => s.match(/[+-]?\d+(?:\.\d+)?/g)[0] || null;
const clean = (t) => t.replace(/[\W_]+/g, '');
const amount = (n) => Number(n).toFixed(2);
const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
const splitLines = (t) => t.match(/[^\r\n]+/g);

function balance(book) {
    let result = ``;
    const arrayOfLines = splitLines(book);
    const firstNumber = amount(grabNumber(arrayOfLines[0]));

    result += `Original Balance: ${firstNumber}\r\n`;

    let balance = amount(firstNumber);
    let expenses = [];
    for (let i = 1; i < arrayOfLines.length; i++) {
        const line = arrayOfLines[i];
        let [checkNumber, category, checkAmount] = line.split(' ');

        checkAmount = amount(grabNumber(checkAmount));
        expenses.push(+checkAmount);
        balance = amount(balance - checkAmount);

        result += `${clean(checkNumber)} ${clean(category)} ${checkAmount} Balance ${balance}\r\n`;
    }

    const totalExpense = amount(firstNumber - balance);
    result += `Total expense  ${totalExpense}\r\n`;

    const averageExpense = amount(average(expenses));
    result += `Average expense  ${averageExpense}`;

    return result;
}
