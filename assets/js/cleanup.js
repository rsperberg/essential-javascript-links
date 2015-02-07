//  cleanup.js
/*
The MIT License (MIT)

Copyright (c) 2015 Eric Elliott

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Original author of this script: rsperberg@gmail.com
*/


var fs = require("fs");
var doclistPath = '/Users/sperberx/dev/essential-javascript-links/';
var doclistName = 'README';
var doclistAddon = '-new';
var doclistExtension = '.md';

/*
files I'm testing with
/Users/sperberx/dev/essential-javascript-links/misc/some-wrong-apos.md
/Users/sperberx/dev/essential-javascript-links/README.md
/Users/sperberx/dev/essential-javascript-links/misc/README-ee.md
/Users/sperberx/dev/essential-javascript-links/misc/README-short1.md
*/


//  identify each type of change, particularly for the apostrophe, since global change (e.g., /.'./g or /(\w|\d)'(\w|\d)/g) is just too risky
//  By making only known changes, stray apostrophes and quotes can be located easily
var aposD = /'d\b/g;  // I'd
var aposLl = /'ll\b/g;  //  you'll
var aposM = /'m\b/g;  //  I'm
var aposRe = /'re\b/g;  //  you're
var aposS = /'s\b/g;  //  it's
var aposT = /'t\b/g;  //  don't
var aposVe = /'ve\b/g;  // I've
var oAposR = /O'R/g;  //  O'Reilly
var spaceQuot = / "\b/g;  //  open quote (eg, precedes a 'word boundary')
var quotSpace = /\b"/g;  //  close quote (eg, is preceded by a 'word boundary')
var spaceDashSpace = / - /g;
//  not yet defined:  single quotes within double quotes
// var spaceApos = / '/
// var aposSpace = /' /

// identify the replacements for each change above
var rsqD = "’d";
var rsqLl = "’ll";
var rsqM = "’m";
var rsqRe = "’re";
var rsqS = "’s";
var rsqT = "’t";
var rsqVe = "’ve";
var OrsqR = "O’R";
var spaceLdq = ' “';
var rdqSpace = '”';
var spaceEmDashSpace = " — ";


/*  store components of path  */
var pathAndFile = doclistPath + doclistName + doclistExtension;   //   /Users/sperberx/dev/essential-javascript-links/README.md
var pathAndFileNew = doclistPath + doclistName+ doclistAddon + doclistExtension;   //   /Users/sperberx/dev/essential-javascript-links/README-new.md

var aFile = fs.readFile(pathAndFile, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    //  This seems really awkward to me, but it's working
    function cleanUp(someFile) {
        var removes = [aposD,  aposLl, aposM, aposRe, aposS, aposT, aposVe, oAposR, spaceQuot, quotSpace, spaceDashSpace];
        var replaceWiths = [rsqD,  rsqLl, rsqM, rsqRe, rsqS, rsqT, rsqVe, OrsqR, spaceLdq, rdqSpace, spaceEmDashSpace];

        for (var counter = 0; counter < removes.length; counter++) {
            someFile = someFile.replace(removes[counter], replaceWiths[counter]);
        }
        return someFile;
   }
    var result = cleanUp(data);

//    console.log(result);
    console.log('got result back');

    fs.writeFile(pathAndFileNew, result, function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });

});

