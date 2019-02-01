const ranksValues = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const rank = (c) => c.length > 2 ? c[0] + c[1] : c[0];
const suit = (c) => c[c.length - 1];
const orderRanks = (hand) => hand.sort((a, b) => ranksValues.indexOf(rank(a)) > ranksValues.indexOf(rank(b)));
const grabFive = (cards) => cards.slice(0, 5);
const firstMapVal = (map) => map.values().next().value;
const firstMapKey = (map) => Array.from(map.keys())[0];
const secondBiggestMapKey = (map) => {
    const mapCopy = new Map(map);
    mapCopy.delete(firstMapKey(mapCopy));
    let maxCard = firstMapKey(mapCopy);
    for (let key of mapCopy) {
        if (ranksValues.indexOf(key) > ranksValues.indexOf(maxCard)) {
            maxCard = key;
        }
    }
    return maxCard;
};
const mapper = (h, mod) => {
    let map = h.reduce((acc, s) => {
        const val = mod(s);
        let count = acc.get(val);
        if (count === undefined) acc.set(val, 1);
        else acc.set(val, count + 1);
        return acc
    }, new Map());
    return new Map([...map.entries()].sort((a, b) => a[1] < b[1]));
};
const consecutiveNumbers = (hand, checkSuit = null) => {
    const uniqueCards = [...new Set(hand.map(rank))];
    let consecutive = checkSuit && !hand.includes(uniqueCards[0] + checkSuit) ? [] : [uniqueCards[0]];

    let indexes = uniqueCards.map(c => ranksValues.indexOf(c));

    for (let i = 1; i < indexes.length; i++) {
        const current = indexes[i];
        let previous = indexes[i - 1];

        if (checkSuit && !hand.includes(uniqueCards[i] + checkSuit)) {
            continue;
        }

        if (!(previous < current && (++previous - current) === 0)) {
            if ((indexes.length - consecutive.length) >= 5) {
                // clear because can still find 5 consecutive cards
                consecutive = [uniqueCards[i]];
            } else {
                break;
            }
        } else {
            consecutive.push(uniqueCards[i]);
        }
    }

    return grabFive(consecutive);
};
const getHandFromMappedRanks = (map) => {
    const result = [];
    let totalCardsInHand = 0;
    for (let [key, value] of map) {
        if (totalCardsInHand < 5) {
            result.push(key);
            totalCardsInHand += value;
        }
    }
    return result;
};

function hand(holeCards, communityCards) {
    const wholeHand = orderRanks([...communityCards, ...holeCards]);
    const mappedSuits = mapper(wholeHand, suit);
    const canBeFlush = firstMapVal(mappedSuits) >= 5;
    const consecutiveCards = consecutiveNumbers(wholeHand);
    const canBeStraight = consecutiveCards.length === 5;

    if (canBeStraight && canBeFlush) {
        const straightFlushConsecutiveCards = consecutiveNumbers(wholeHand, firstMapKey(mappedSuits));
        const canBeStraightFlush = straightFlushConsecutiveCards.length === 5;

        // Straight Flush
        if (canBeStraightFlush) return { type: 'straight-flush', ranks: straightFlushConsecutiveCards };
    }

    const mappedRanks = mapper(wholeHand, rank);

    // Four of a kind
    const canBeFourOfAKind = firstMapVal(mappedRanks) === 4;
    const secondBiggest = secondBiggestMapKey(mappedRanks);
    if (canBeFourOfAKind) return { type: 'four-of-a-kind', ranks: [firstMapKey(mappedRanks), secondBiggest] };

    const canBeThreeOfAKind = firstMapVal(mappedRanks) === 3;

    // Full House
    if (canBeThreeOfAKind) {
        const secondKey = Array.from(mappedRanks.keys())[1];
        const secondValue = mappedRanks.get(secondKey);

        if (secondValue === 2) {
            return { type: 'full house', ranks: [firstMapKey(mappedRanks), secondKey] };
        }
    }

    // Flush
    if (canBeFlush) {
        const flushCards = grabFive(wholeHand.filter(c => suit(c) === firstMapKey(mappedSuits)).map(rank));
        return { type: 'flush', ranks: flushCards };
    }

    // Straight
    if (canBeStraight) return { type: 'straight', ranks: consecutiveCards };

    // Three-of-a-kind
    if (canBeThreeOfAKind) return { type: 'three-of-a-kind', ranks: getHandFromMappedRanks(mappedRanks) };

    const canBePair = firstMapVal(mappedRanks) === 2;

    if (canBePair) {
        // Two pair
        const secondKey = Array.from(mappedRanks.keys())[1];
        const secondValue = mappedRanks.get(secondKey);

        if (secondValue === 2) {
            const thirdKey = Array.from(mappedRanks.keys())[2];
            return { type: 'two pair', ranks: [firstMapKey(mappedRanks), secondKey, thirdKey] };
        }

        // Pair
        return { type: 'pair', ranks: getHandFromMappedRanks(mappedRanks) };
    }

    // Nothing
    return { type: 'nothing', ranks: grabFive([...new Set(wholeHand.map(rank))]) };
}
