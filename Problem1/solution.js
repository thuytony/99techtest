// Problem 1: Three ways to sum to n

// # Task
// Provide 3 unique implementations of the following function in JavaScript.
// **Input**: `n` - any integer
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// Start: 14:30 - 14 Jun
// End: 14:55 - 14 Jun

var sum_to_n_a = function(n) {
    // checking condition
    if (n < 0) return 0;

   let sum = 0;
   do {
        sum += n;
        n--;
   } while (n >= 1);

   return sum;
};
// -> O(n)

var sum_to_n_b = function(n) {
    let sum = 0;
    for (let i=1; i<=n; i++) {
        sum += i;
    }

    return sum;
};
// -> O(n)

var sum_to_n_c = function(n) {
    // checking condition
    if (n < 0) return 0;

    // break condition
    if (n <= 1) return n;

    return n + sum_to_n_c(n-1);
};
// -> O(n)


// Test case
console.log('value: -1:');
console.log('Solution 1: ', sum_to_n_a(-1));
console.log('Solution 2: ', sum_to_n_b(-1));
console.log('Solution 3: ', sum_to_n_c(-1));

console.log('value: 0:');
console.log('Solution 1: ', sum_to_n_a(0));
console.log('Solution 2: ', sum_to_n_b(0));
console.log('Solution 3: ', sum_to_n_c(0));

console.log('value: 1:');
console.log('Solution 1: ', sum_to_n_a(1));
console.log('Solution 2: ', sum_to_n_b(1));
console.log('Solution 3: ', sum_to_n_c(1));

console.log('value: 5:');
console.log('Solution 1: ', sum_to_n_a(5));
console.log('Solution 2: ', sum_to_n_b(5));
console.log('Solution 3: ', sum_to_n_c(5));