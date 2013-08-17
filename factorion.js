/**
  * Finds all possible factorions - numbers equal to the sum of factorials of
  * their digits
  * @return {array} Array containing all possible factorions
  */
function findFactorions() {

  /**
    * Calculates factorials of all digits
    * @return {array} Array containing factorials of all digits
    */
  function calculateDigitFactorials() {
    var factorials = [1];
    var factorial = 1;
    for (var digit = 1; digit < 10; ++digit) {
      factorial = factorial * digit;
      factorials.push(factorial);
    }
    return factorials;
  }

  /**
    * Finds the power of 10 that is the upper bound of factorions. Uses the
    * following idea: if the number has d digits, then maximum sum of factorials
    * of its digits equals to d * 9! So the number can not be greater than d * 9!
    * @return the upper bound of factorions
    */
  function CalculateUpperBound(factorials) {
    var number = 2;
    while (true) {
      if (Math.pow(10, number - 1) > (number - 1) * factorials[9]) {
        break;
      }
      ++number;
    }
    return number;
  }

  /**
    * Returns array of digits that will be used for faster updates of checking
    * number. To find factorions we should iterate through all numbers from 0 to
    * upper bound, and calculate sum of factorials of their digits. So to speed
    * this process up we will use array of digits that represents the number
    * under consideration.
    * @param {number} no_digit constant that represents no digit
    * @param {number} upper_bound upper bound of factorions
    * @return {array} Array containing digits
    */
  function InitializeDigits(no_digit, upper_bound) {
    var digits = [];
    for (var index = 0; index < upper_bound - 1; ++index) {
      digits.push(no_digit);
    }
    digits.push(0);
    return digits;
  }

  /**
    * Performs increment on the given number and updates the sum of factorials
    * of its digits. In fact, we add 1 to the last element of the array with
    * digits, and, if necessary, updates other elements.
    * @param {number} no_digit constant representing no digit
    * @param {number} sum current sum of factorials of digits
    * @param {array} digits array containing digits representing the number
    * @param {factorials} factorials array containing factorials of all digits
    * @return {number} updated sum of factorials of the next number
    */
  function IncrementNumber(no_digit, sum, digits, factorials) {
    for (var index = digits.length - 1; index >= 0; --index) {
      if (digits[index] == no_digit) {
        digits[index] = 1;
        sum += factorials[1];
        break;
      }
      sum -= factorials[digits[index]];
      if (digits[index] != 9) {
        ++digits[index];
        sum += factorials[digits[index]];
        break;
      }
      digits[index] = 0;
      sum += factorials[0];
    }
    return sum;
  }

  const NO_DIGIT = -1;
  var factorions = [];
  var factorials = calculateDigitFactorials();
  var upper_bound = CalculateUpperBound(factorials);
  var digits = InitializeDigits(NO_DIGIT, upper_bound);
  upper_bound = Math.pow(10, upper_bound);
  var sum = factorials[0];
  for (var number = 0; number < upper_bound; ++number) {
    if (sum == number) {
      factorions.push(number);
    }
    sum = IncrementNumber(NO_DIGIT, sum, digits, factorials);
  }
  return factorions;
}