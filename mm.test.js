const { MarkovMachine } = require('./markov');
let newMM;

beforeAll(function() {
    newMM = new MarkovMachine('the cat in the hat is in the hat');
});

describe('test markovmachine class', function() {
    test('test newMM instance', function() {
        expect(newMM).toEqual(expect.any(Object));
        expect(newMM.words).toEqual(expect.any(Array));
        expect(newMM.words).toContain('hat');
        expect(newMM.words).toContain('cat');
    });
});

describe('test makeText method', function() {
    let newText;
    let allWords;

    beforeAll(function() {
        newText = newMM.makeText(); 
    });
    
    test('length of text is always minimum 1 word', function() {
        expect(newText).toEqual(expect.any(String));
        expect(newText.length).toBeGreaterThan(0);
    });
    test('number of words is less/equal than provided argument (or100))', function() {
        allWords = newText.split(' ');
        expect(allWords.length).toBeLessThanOrEqual(100);
    });
    test('the last word is always a part of created text', function() {
        expect(newText).toContain('hat');
    });
    test('chains check', function() {
        const keys = Object.keys(newMM.chain);
        expect(keys[0]).toEqual('the cat');
        expect(newMM.chain[keys[0]][0]).toEqual('in');
        expect(keys.length).toEqual(6);
    });
});