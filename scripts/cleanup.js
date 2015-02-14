//  cleanup.js
/*
 * MIT license http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2015 Eric Elliott
 * Original author of this script: rsperberg@gmail.com
 */

var fs = require("fs");

//  identify each type of change, particularly for the apostrophe, since global change (e.g., /.'./g or /(\w|\d)'(\w|\d)/g) is just too risky
//  By making only known changes, stray apostrophes and quotes can be located easily
//  not yet defined:  single quotes within double quotes

var replacements = [
    { searchFor: /'d\b/g, replaceWith: "’d"},    // I'd
    { searchFor: /'ll\b/g, replaceWith: "’ll"},    //  you'll
    { searchFor: /'m\b/g, replaceWith: "’m"},    //  I'm
    { searchFor: /'re\b/g, replaceWith: "’re"},    //  you're
    { searchFor: /'s\b/g, replaceWith: "’s"},    //  it's
    { searchFor: /s'(\s)/g, replaceWith: "s’$1"},    //  plural possessive
    { searchFor: /'t\b/g, replaceWith: "’t"},   //  don't
    { searchFor: /'ve\b/g, replaceWith: "’ve"},   //  I've
    { searchFor: /(\s)'(\d\ds)/g, replaceWith: "$1’$2"},   //  ’90s
    { searchFor: /O'([A-Z])/g, replaceWith: "O’$1"},    //  O'Reilly
    { searchFor: /",/g, replaceWith: ',”'},    // comma outside quote mark
    { searchFor: /"\./g, replaceWith: '.”'},    // period outside quote mark (transpose only)
    { searchFor: /"\b/g, replaceWith: '“'},    //  open quote (eg, precedes a 'word boundary')
    { searchFor: /\b"/g, replaceWith: '”'},    //  close quote (eg, is preceded by a 'word boundary')
    { searchFor: /\b([\.|,|\?|!|;|:|-|—])"/g, replaceWith: '$1”'},    //  close quote after punctuation (which is itself preceded by a 'word boundary')
    { searchFor: / - /g, replaceWith: " — "}    //  em dash with spaces surrounding it
];
// using package.json script: cleanup to read README.md via cat
var aFile = fs.readFile('/dev/stdin', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    //  for each object in the replacements array, go through the document and make the replacement
    function cleanUp(someFile) {
        replacements.forEach(function(replacement) {
            someFile = someFile.replace(replacement.searchFor, replacement.replaceWith);
        })
        return someFile;
   }
    var result = cleanUp(data);
    // now pipe the result to be stored in build/README.md
    console.log(result);

});
