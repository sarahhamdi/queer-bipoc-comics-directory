/*jshint esversion: 6 */

let sheetsu = {};
let goodreads = {};
let generic = {};
generic.userInputArray = [];

// api endpoints and keys
sheetsu.endpoint = 'https://sheetsu.com/apis/v1.0/ea0629575c7c';
goodreads.endpoint = 'https://www.goodreads.com/book/title.xml';
goodreads.key = 'AYoaCzPGXisCTWsP6Ainw';

// success and error messages
generic.error = (data) => console.log(data);
goodreads.success = (data) => console.log(data.GoodreadsResponse.book.description);
sheetsu.success = (books) => {
    books.filter((book) => {
        if (book.authorLGBTQ == 'y') {
            console.log(book.bookTitle);
            goodreads.getData(book.bookTitle);
        }
    });
};

// +++++++++ API CALLS ++++++++++++++++++++++
// sheetsu.getData = () =>
//     $.ajax({
//         url: sheetsu.endpoint,
//         dataType: 'json',
//         type: 'GET',
//         // place for handling successful response
//         success: sheetsu.success,
//         // handling error response
//         error: generic.error,
//     });

// goodreads.getData = (title) =>
//     $.ajax({
//         url: 'http://proxy.hackeryou.com',
//         dataType: 'json',
//         method: 'GET',
//         data: {
//             reqUrl: goodreads.endpoint,
//             params: {
//                 key: goodreads.key,
//                 title: title
//             },
//             xmlToJSON: true
//         },
//         success: goodreads.success,
//         error: generic.error,
//     });

sheetsu.getData = [{
        "author": "Alison Bechdel",
        "authorPoC": "n",
        "authorLGBTQ": "y",
        "bookTitle": "The Essential Dykes to Watch Out For",
        "characterLGBTQ": "y",
        "characterPoC": "y",
        "webcomicWithPrintBook": ""
    },
    {
        "author": "Sophie Campbell",
        "authorPoC": "y",
        "authorLGBTQ": "y",
        "bookTitle": "Wet Moon, Volume 1: Feeble Wanderings",
        "characterLGBTQ": "y",
        "characterPoC": "y",
        "webcomicWithPrintBook": ""
    },
    {
        "author": "Kelly Thompson, Sophie Campbell (artist)",
        "authorPoC": "n",
        "authorLGBTQ": "y",
        "bookTitle": "Jem and the Holograms",
        "characterLGBTQ": "n",
        "characterPoC": "n",
        "webcomicWithPrintBook": ""
    },
    {
        "author": "Mariko Tamaki, Jillian Tamaki (illustrator)",
        "authorPoC": "y",
        "authorLGBTQ": "y",
        "bookTitle": "Skim",
        "characterLGBTQ": "y",
        "characterPoC": "y",
        "webcomicWithPrintBook": ""
    },
];
// +++++++++ EVENT HANDLER ++++++++++++++++++++++

var things = ['authorPoC', 'authorLGBTQ'];

generic.getUserInput = () =>
    $('.choose-comics').on('submit', function(event) {
        event.preventDefault();
        generic.userInputArray = [];
        $('input:checked').each(function() {
            generic.userInputArray.push($(this).val());
            console.log($(this).val());
        });
        console.log(generic.userInputArray);
        console.log(filtered);
        // filtered(generic.userInputArray);

    });

// filters through all the sheetsu data
var filtered = (things) =>
    sheetsu.getData.filter(book =>
        // for every user selection value
        // this function returns an array of books 
        // that have the 'key' value of that selection as 'y' (e.g. 'authorLGBTQ' = 'y')
        things.every(thing =>
            // uses bracket notation bc you can't use dot notation with arrays
            book[thing] === 'y'));



// +++++++++ DOCUMENT READY ++++++++++++++++++++++
$(function() {

    // sheetsu.getData();
    generic.getUserInput();
    // console.log(filtered);
    // filtered();

});

// 1. sheetsu ajax call (new promise)
// 2. .then() filter based on user Selection
// 3. .then() find data in goodreads
// 4. .then() clean up data
// 5. .then() display to pageXOffset
// 6. .then() activate slider