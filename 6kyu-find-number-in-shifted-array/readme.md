# Find n in 'sorted & shifted' array
Solving a codewars kata for looking for a `n` number in a 'sorted and shifted' array of numbers

https://www.codewars.com/kata/find-number-in-an-array-number-6

-------

## Description:
Give an integer array `arr`. It is sorted and shifted array. What's the mean of "sorted and shifted"? That is: At first, the array was sorted, like this:

 `arr = [1,2,3,4,5,6]`
 
Then the array performs a shift operation(the shift amount is unkown), perhaps became to:

 `[5,6,1,2,3,4]`
 
This is what a "sorted and shifted" array.

Then given a number `n`, your task is find and return the index of n. Or return -1 if n is not found.

## Note:
- Arguments arr always be an valid array; All the elements are integers (positive, negative and zero); You can assume that there are no duplicate numbers in the array.
- Please pay attention to optimizing the code to avoid time out.
- In the performance test(10000000 elements x 100 testcases), the time consuming of each test case should be within 3ms. This means, Your algorithm should be faster than O(n), your code should run as fast as a rocket ;-)

## Some Examples
```javascript
findIndexOf([5,6,1,2,3,4],3) === 4
findIndexOf([9,11,12,1,3,5,7],5) === 5
findIndexOf([9,11,12,1,3,5,7],2) === -1
```
