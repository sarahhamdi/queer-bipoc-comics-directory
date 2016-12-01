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
    console.log(books);
    let things = generic.userInputArray;
    let filtered = books.filter(book =>
        // for every user selection value
        // this function returns an array of books 
        // that have the 'key' value of that selection as 'y' (e.g. 'authorLGBTQ' = 'y')
        things.every(thing =>
            // uses bracket notation bc you can't use dot notation with arrays
            book[thing] === 'y'));
    console.log(filtered);
};

// +++++++++ API CALLS ++++++++++++++++++++++
sheetsu.getData = () =>
    $.ajax({
        url: sheetsu.endpoint,
        dataType: 'json',
        type: 'GET',
        // place for handling successful response
        success: sheetsu.success,
        // handling error response
        error: generic.error,
    });

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

// // +++++++++ EVENT HANDLER ++++++++++++++++++++++
generic.getUserInput = () => {

    $('.choose-comics').on('submit', function(event) {
        generic.userInputArray = [];
        event.preventDefault();
        $('input:checked').each(function() {
            generic.userInputArray.push($(this).val());
            console.log($(this).val());
        });
        console.log(generic.userInputArray);
        sheetsu.getData();
        // console.log(filtered);
        // filtered(generic.userInputArray);

    });
};

// +++++++++ DOCUMENT READY ++++++++++++++++++++++
$(function() {

    sheetsu.getData();
    generic.getUserInput();

});

// 1. sheetsu ajax call (new promise)
// 2. .then() filter based on user Selection
// 3. .then() find data in goodreads
// 4. .then() clean up data
// 5. .then() display to pageXOffset
// 6. .then() activate slider