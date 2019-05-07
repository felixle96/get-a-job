/*******************************************************************************
 * 10.4 Sorted Search, No Size:
 * Brute Force:
 *  Time Complexity: O(n)
 *  Space Complexity: O(1)
 *  Iterate through Listy one time and return index it occurs at.
 * Approach 1:
 *  Time Complexity: 
 *  Space Complexity: O(1) iterative, O(logn) recursive
 *  Do a variant of a binary search given that there is no size. Index
 *  listy at the value we are looking for. If out of bounds or value is 
 *  less than value at index then look at halfway point. If value is 
 *  greater than value at index look at double the bounds.
 * Approach 2:
 *  Time Complexity: O(logn)
 *  Space Complexity: O(1) iterative, O(logn) recursive
 *  Do a binary search by finding the size. Using an exponentional 
 *  backoff would take O(logn) instead of O(n).
 ******************************************************************************/

 /**
  * Find the index of a positive integer value in listy.
  * @param {Object} listy Data structure that's an array with no size method, returns -1 on out of bounds.
  * @param {Number} findVal Positive integer to find. 
  */
 function sortedSearch(listy, findVal) {

 }

 /**
  * Find the length of listy using exponential backoff.
  * @param {Object} listy Listy data structure. 
  */
 function findLength(listy) {

 }