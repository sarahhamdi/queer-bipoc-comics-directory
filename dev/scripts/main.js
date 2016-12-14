/*jshint esversion: 6 */

// all the objects
let sheetsu = {};
let goodreads = {};
let generic = {};
let comicsApp = {};

// placeholders
comicsApp.userInputArray = [];
sheetsu.books = [];
generic.index = 0;

// api endpoints and keys
sheetsu.endpoint = 'https://sheetsu.com/apis/v1.0/7bc7a770513b';
goodreads.endpoint = 'https://www.goodreads.com/book/title.xml';
goodreads.key = 'AYoaCzPGXisCTWsP6Ainw';

// success and error messages
generic.error = (data) => {
    console.log(`goodreads error ${data}`);
    generic.index++;
};
goodreads.success = (grBooks) => {
    helpers.printToPage(grBooks);
    helpers.initSlider();
};
sheetsu.success = (sBooks) => {
    sheetsu.filtered(sBooks);
};

// +++++++++ FILTERING SHEETSU DATA BASED ON USER INPUT - THANKS WES BOS! ++++++++++++++++++++++
sheetsu.filtered = (sBooks) => {
    sheetsu.filteredBooks = sBooks.filter(book =>
        // for every user selection value
        // this function returns an array of books 
        // that have the 'key' value of that selection as 'y' (e.g. 'authorLGBTQ' = 'y')
        comicsApp.userInputArray.every(arrayItem =>
            // uses bracket notation bc you can't use dot notation when using array results with objects
            book[arrayItem] === 'y'));

    sheetsu.filteredBooks.map(filteredBook => {
        console.log(filteredBook.bookTitle);
        goodreads.getData(filteredBook.bookTitle);
    });
};

// +++++++++ API CALLS ++++++++++++++++++++++
sheetsu.getData = () =>
    $.ajax({
        url: sheetsu.endpoint,
        dataType: 'json',
        type: 'GET',
        success: sheetsu.success,
        error: generic.error,
    });

goodreads.getData = (sheetsuBookTitle) =>
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: goodreads.endpoint,
            params: {
                key: goodreads.key,
                title: sheetsuBookTitle
            },
            xmlToJSON: true
        },
        success: goodreads.success,
        error: generic.error,
    });

// // +++++++++ EVENT HANDLER FOR USER INPUT ++++++++++++++++++++++
comicsApp.getUserInput = () => {
    $('.choose-comics').on('submit', function(event) {
        event.preventDefault();
        generic.index = 0;
        comicsApp.userInputArray = [];
        helpers.resetSlider();

        $('input:checked').each(function() {
            comicsApp.userInputArray.push($(this).val());
        });

        sheetsu.getData();
    });
};

// +++++++++ DOCUMENT READY ++++++++++++++++++++++
$(function() {

    comicsApp.getUserInput();

});