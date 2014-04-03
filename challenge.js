var example1 = '((your[drink {remember to}]) ovaltine)',
  example2 = '[racket for {brackets (matching) is a} computers]',
  example3 = '[can {and it(it (mix) up ) } look silly]';


var bracketsToString = function (inputString) {
  var closingBracketIndex, compiledString = '', startIndex, endIndex,
    getFirstClosingBracketIndex = function () {
      var indexesOfClosingBrackets = [
        inputString.indexOf(']'),
        inputString.indexOf('}'),
        inputString.indexOf(')')
      ], validIndexesOfClosingBrackets = [];

      for (var i = indexesOfClosingBrackets.length - 1; i > -1; i--) {
        if(indexesOfClosingBrackets[i] !== -1) {
          validIndexesOfClosingBrackets.push(indexesOfClosingBrackets[i]);
        }
      }

      endIndex = Math.min.apply(Math, validIndexesOfClosingBrackets);
    },
    getContentFromABracket = function () {
      var bracketType = inputString.charAt(endIndex),
        bracketMatches = {']':'[', '}':'{', ')':'('},
        matchingBracket = bracketMatches[bracketType],
        inputArray = inputString.split('');

      for (var i = endIndex; i > -1; i--) {
        if (inputArray[i] === matchingBracket) {
          startIndex = i;
          break;
        }
      }

      return inputString.substring(startIndex + 1, endIndex).trim() + ' ';
    },
    clearABracket = function () {
      var clearedString = inputString.substring(0, startIndex).trim();
      clearedString += ' ' + inputString.substring(endIndex + 1).trim();
      return clearedString;
    };

  while (inputString.trim().length > 0) {
    getFirstClosingBracketIndex();
    compiledString += getContentFromABracket();
    inputString = clearABracket();
  }

  return compiledString;
};

console.log('END:', bracketsToString(example1));
console.log('END:', bracketsToString(example2));
console.log('END:', bracketsToString(example3));