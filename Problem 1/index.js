var sum_to_n_a = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_b = function (n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function (n) {
  if (n <= 0) {
    return 0; // Handle the case where n is less than or equal to 0
  }
  return n + sum_to_n_c(n - 1);
};
