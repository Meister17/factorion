/**
  * Находит все факторионы, т.е. числа, равные сумме факториалов своих цифр
  * @return {Number}[] Массив всех найденных факторионов
  */
function findFactorions() {

  /**
    * Вспомогательная функция. Вычисляет факториалы всех цифр.
    * @return {Number}[] Массив факториалов всех цифр
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
    * Находит такую степень десяти, что число в этой степени является верхней
    * границей факторионов. Используется следующая идея: если число состоит из
    * d цифр, то максимальная сумма факториалов цифр такого числа равна d * 9!
    * Поэтому число не может быть больше этой суммы.
    * @return {Number} такая степень десяти, что число в этой степени является
    * верхней границей факторионов
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
    * Возвращает массив, заполненный переданной константой no_digit и состоящий
    * из upper_bound элементов (в последнем элементе 0). Такой массив будет
    * использоваться для быстрого инкеремента числа и пересчета суммы
    * факториалов его цифр.
    * @param {Number} no_digit константа, означающая отсутствие цифры
    * @param {Number} upper_bound верхняя граница факторионов
    * @return {Number}[] массив, заполненной константой no_digit и состоящий из
    * upper_bound элементов (в последнем элементе 0).
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
    * Осуществляет инкремент переданного числа и пересчет суммы факториалов его
    * цифр. Фактически, добавляется 1 к последнему элементу массива, и затем,
    * при необходимости, обновляются и другие элементы.
    * @param {Number} no_digit константа, означающая отсутствие цифры
    * @param {Number} sum текущая сумма факториалов цифр переданного числа
    * @param {Number}[] digits массив, содержащий цифры переданного числа
    * @param {Number}[] factorials массив, содержащий факториалы всех цифр
    * @return {Number} обновлённая сумма факториалов цифр следующего числа
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