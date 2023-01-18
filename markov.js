/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = this.makeChains();
  }

  makeChains() {
    let chain = {};
    let words;
    let nextWord;
    for (let x = 0; x < this.words.length-2; x++) {
      words = this.words[x] + ' ' + this.words[x+1];
      nextWord = this.words[x+2];
      if (!(words in chain)) {
        if (nextWord !== undefined) {
          chain[words] = [nextWord];
        } else {
          chain[words] = [null];
        }
  
      } else {
        if (nextWord !== undefined) {
          chain[words].push(nextWord);
        } else {
          chain[words].push(null);
        }
      }
    }
    return chain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let phrase = "";
    let keepGoing = true;
    let thisVal;
    let nextVal;
    let capCount = 0;
    const keys = Object.keys(this.chain);
    let filteredChain = []

    //after so many tries, you'll just get any old (non-capitalized) word.
    while(capCount < numWords) {
        thisVal = Object.keys(this.chain)[Math.floor(Math.random() * Object.keys(this.chain).length)];
        if (thisVal[0].toUpperCase() === thisVal[0]) {
            break;
        }
        capCount++;
    }
    phrase += thisVal + ' ';
    while(keepGoing) {            
        nextVal = this.chain[thisVal][Math.floor(Math.random() * this.chain[thisVal].length)];

        if (nextVal === null || phrase.split(" ").length > numWords) {
            keepGoing = false;
        } else {
            for (let x = 0; x < keys.length; x++) {
                if (keys[x].startsWith(nextVal)) {
                    filteredChain.push(keys[x]);
                }
            }
            //select at random
            nextVal = filteredChain[Math.floor(Math.random() * filteredChain.length)];
            if (nextVal[nextVal.length-1] === '.') {
                phrase += nextVal;
                keepGoing = false;
            } else {
                phrase += nextVal + ' ';
                thisVal = nextVal;
                filteredChain.length = 0;
            }
        }
    }
    return phrase;
  }
}

module.exports = {
  MarkovMachine
};

