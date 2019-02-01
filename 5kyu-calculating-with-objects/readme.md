# Calculating with Objects
Solving a codewars kata for changing a class behaviour

https://www.codewars.com/kata/calculating-with-objects/javascript

-------
## Description:
Bob made a class called Num.

```javascript
class Num {
  constructor(num){
    this.num=num;
  }
  toString() {
    return "The number is " + this.num;
  }
  valueOf() {
    return {num: this.num};
  }
}
```

He's trying to work with it like this:

```javascript
x = new Num(100);
y = new Num(5);
x + y == 105;
x*y == 500;
x-y == 95
x/y == 20
Math.floor(new Num(100.5)) == 100
etc..
```

But it doesn't work.. He keeps getting `'[object Object][object Object]'` as a result..

He also wants to be able to use the existing `valueOf` and `toString` methods, so we shouldn't change those.

```javascript
x = new Num(100);
x.toString() == "The number is " + num
x.valueOf() == {num: this.num}
```
