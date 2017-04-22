// require stuff and process the input.  theCard is supposed to be the card added. Should not be global.  Fix later.

var fs = require("fs");
var theInput = (process.argv).slice(2);
var theCard;


// card constructor
function Card(typ, stat, clo) {
  this.typeOfCard = typ;
  this.theQorS = stat;
  this.theAorC = clo;
}

// figure out if you are getting or adding, plus a few tests.
function toDo(inp) {
  if (inp[0] === "get") {
    getCard(inp);
  } else if (inp[0] === "add") {
    if ((x[1] === "cloze") && (!(x[2].includes(x[3])))) {
      console.log("Your cloze is not in your string.");
      return;
    }
    addCard(inp);
  } else {
    console.log("You didn't tell me what to do:  get or add?");
  }
}

// Get a card.
function getCard(x) {
  if (!x[1]) {
    console.log("You didn't to tell me what type of card you want: basic or cloze?");
    return;
  }
  if (x[2]) {
    console.log("I ignored everything you said after " + x[1]);
  }
  fs.readFile("theCards.js", "utf8", function(err, data) {
    var theObjs = JSON.parse(data);
    if (err) {
      return console.log(err);
    }
    var x = Math.floor(Math.random() * (data.length - 1));
    console.log(data[x]);
  });
}


// add a card;
function addCard(x) {
  if ((x[4]) || (!x[3])) {
    console.log(
      "Your command should be add [basic or cloze] [question or full string in quotes] [answer or cloze in quotes]"
    );
    return;
  } else {
    console.log(x);
    theCard = new Card(x[1], x[2], x[3]);
    if (x[1] === "cloze") {
      theCard.partialString = (x[2].replace(x[3], ""));
    }
  }
  fs.appendFile("theCards.js", theCard, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

toDo(theInput);
