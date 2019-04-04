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
sheetsu.endpoint = 'https://sheetlabs.com/SARA/comicslgbtqpoc?';
goodreads.endpoint = 'https://www.goodreads.com/book/title.xml';
goodreads.key = 'AYoaCzPGXisCTWsP6Ainw';

// success and error messages
generic.error = (data) => {
    console.log(`goodreads error ${data}`);
    helpers.initSlider();
};
goodreads.success = (grBooks) => {
    helpers.printToPage(grBooks);
    helpers.initSlider();
};
sheetsu.success = (sBooks) => {
    sheetsu.filtered(sBooks);
    console.log("working?");
};

// +++++++++ FILTERING SHEETSU DATA BASED ON USER INPUT - THANKS WES BOS! ++++++++++++++++++++++
sheetsu.filtered = (sBooks) => {
    sheetsu.filteredBooks = sBooks.filter(book =>
        // for every user selection value
        // this function returns an array of books 
        // that have the 'key' value of that selection as 'y' (e.g. 'authorLGBTQ' = 'y')
        comicsApp.userInputArray.every(arrayItem =>
            // uses bracket notation bc you can't use dot notation when using array results with objects
            book[arrayItem] === "1"));

    sheetsu.filteredBooks.map(filteredBook => {
        console.log(filteredBook.bookTitle);
        goodreads.getData(filteredBook.booktitle);
    });
}; 

// +++++++++ API CALLS ++++++++++++++++++++++
sheetsu.getData = () =>
    $.ajax({
        // http may be used instead of https if required
        url: sheetsu.endpoint,
        crossDomain : true,
        beforeSend: function(xhr, settings) {
          xhr.setRequestHeader("Authorization","Basic "+btoa("s.hamdi@gmail.com:t_a1ae6e22b56cf1358a57c229a018dd93"));
        },
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
    helpers.dropdownCollapseExpand();
    $('.choose-comics').on('submit', function(event) {
        $('#results').addClass('show');
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