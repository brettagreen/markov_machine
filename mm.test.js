const makeTest = require('./makeText');
//const MarkovMachine = require('./markov');

describe("test processing of urls and files", function () {
    test("gutenberg text url", async function () {
      const response = await makeTest.webCat('http://www.gutenberg.org/files/11/11-0.txt');
      expect(response).toEqual(expect.any(String));
    });

    test('eggs text file', async function() {
        const response = await makeTest.cat('eggs.txt');
        expect(response).toEqual(expect.any(String));
    })
});