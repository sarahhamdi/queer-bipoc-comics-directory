/*jshint esversion: 6 */

let sheetsu = {};
sheetsu.endpoint = 'https://sheetsu.com/apis/v1.0/ea0629575c7c';
let generic = {};
generic.success = (data) => console.log(data);
// data.filter((book) => {
//     if (book.authorLGBTQ == 'y') {
//         console.log(book);
//     }
// });
generic.error = (data) => console.log(data);

let goodreads = {};
goodreads.endpoint = 'https://www.goodreads.com/book/title.xml';
goodreads.key = 'AYoaCzPGXisCTWsP6Ainw';


// +++++++++ API CALLS ++++++++++++++++++++++
sheetsu.getData = () =>
    $.ajax({
        url: sheetsu.endpoint,
        dataType: 'json',
        type: 'GET',
        // place for handling successful response
        success: generic.success,
        // handling error response
        error: generic.error,
    });

goodreads.getData = () =>
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        dataType: 'json',
        method: 'GET',
        data: {
            reqUrl: goodreads.endpoint,
            params: {
                key: goodreads.key,
                title: "This Is How You Lose Her"
            },
            xmlToJSON: true
        },
        success: generic.success,
        error: generic.error,
    });



// +++++++++ DOCUMENT READY ++++++++++++++++++++++
$(function() {

    sheetsu.getData();
    goodreads.getData();

});