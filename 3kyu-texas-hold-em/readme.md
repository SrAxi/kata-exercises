# hold-em-texas-kata
Solving a codewars kata for analysing possible winning hands

https://www.codewars.com/kata/texas-holdem-hands

-------

Texas Hold'em is a Poker variant in which each player is given two "hole cards". Players then proceed to make a series of bets while five "community cards" are dealt. If there are more than one player remaining when the betting stops, a showdown takes place in which players reveal their cards. Each player makes the best poker hand possible using five of the seven available cards (community cards + the player's hole cards).

Possible hands are, in descending order of value:

- Straight-flush (five consecutive ranks of the same suit). Higher rank is better.
- Four-of-a-kind (four cards with the same rank). Tiebreaker is first the rank, then the rank of the remaining card.
- Full house (three cards with the same rank, two with another). Tiebreaker is first the rank of the three cards, then rank of the pair.
- Flush (five cards of the same suit). Higher ranks are better, compared from high to low rank.
- Straight (five consecutive ranks). Higher rank is better.
- Three-of-a-kind (three cards of the same rank). Tiebreaker is first the rank of the three cards, then the highest other rank, then the second highest other rank.
- Two pair (two cards of the same rank, two cards of another rank). Tiebreaker is first the rank of the high pair, then the rank of the low pair and then the rank of the remaining card.
- Pair (two cards of the same rank). Tiebreaker is first the rank of the two cards, then the three other ranks.
- Nothing. Tiebreaker is the rank of the cards from high to low.

Given hole cards and community cards, complete the function hand to return the type of hand (as written above, you can ignore case) and a list of ranks in decreasing order of significance, to use for comparison against other hands of the same type, of the best possible hand.

```javascript
hand(["A♠", "A♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"])
// ...should return {type: "pair", ranks: ["A", "J", "10", "5"]}
hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"]) 
// ...should return {type: "flush", ranks: ["Q", "J", "10", "5", "3"]}
```

EDIT: for Straights with an Ace, only the ace-high straight is accepted. An ace-low straight is invalid (ie. A,2,3,4,5 is invalid). This is consistent with the author's reference solution.
