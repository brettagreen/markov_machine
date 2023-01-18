const fs = require('fs');
const axios = require('axios');
const striptags = require('striptags');
const { MarkovMachine } = require("./markov");

async function cat(path) {
    await fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(err);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        // otherwise success
        const mm = new MarkovMachine(data);
        phrase = mm.makeText();
        console.log(phrase);
      });

}

async function webCat(url) {
    const phrase = await axios.get(url).then(function(resp) {
        const mm = new MarkovMachine(striptags(resp.data));
        return mm.makeText();
    })
    .catch(err => {
        console.log(err);
    })
    return phrase;
}

(async () => {
    if (process.argv[2] === 'file') {
        console.log(await cat(process.argv[3]));
    } else {
        console.log(await webCat(process.argv[3]));
    }

})();

module.exports = {
    cat,
    webCat
  };