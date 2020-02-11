let primeMedians = n => {
  // Eratosthenes algorithm to find all primes under n
  let array = [],
    upperLimit = Math.sqrt(n),
    output = [];

  // Make an array from 2 to (n - 1)
  for (let i = 0; i < n; i++) {
    array.push(true);
  }

  // Remove multiples of primes starting from 2, 3, 5,...
  for (let i = 2; i <= upperLimit; i++) {
    if (array[i]) {
      for (let j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }

  for (let i = 2; i < n; i++) {
    array[i] && output.push(i);
  }

  //Calculate the median from the sorted output array
  let mid = Math.floor(output.length / 2);
  return output.length % 2 ? [output[mid]] : [output[mid - 1], output[mid]];
};

module.exports = primeMedians;
