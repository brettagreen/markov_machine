const fs = require('fs');
const axios = require('axios');
const striptags = require('striptags');
const { MarkovMachine } = require("./markov");

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          // handle possible error
          console.error(err);
          // kill the process and tell the shell it errored
          process.exit(1);
        }
        // otherwise success
        const mm = new MarkovMachine(data);
        console.log(mm.makeText());
      });

}

function webCat(url) {
    axios.get(url).then(function(resp) {
        const mm = new MarkovMachine(striptags(resp.data));
        console.log(mm.makeText());
    })
    .catch(err => {
        console.log(err);
    })
}

if (process.argv[2] === 'file') {
    cat(process.argv[3]);
} else {
    webCat(process.argv[3]);
}
