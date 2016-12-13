/*jshint esversion: 6 */

let helpers = {};

// +++++++ cleans up weird characters in the goodreads book descriptons +++++++
helpers.cleanup = (string) => {
    return string.replace(/&lt;\/*[a-z]*&gt;/g, "").replace(/&amp;/g, "&").replace(/&lt;br \/&gt;/g, " ");
};

// +++++++ replaces goodreads rating with svg stars +++++++
helpers.rating = (bookRating) => {
    let stars = [];
    let intRating = parseInt(bookRating);
    for (let m = 0; m < intRating; m++) {
        stars.push('<img src="public/assets/star.svg">');
    }
    stars = stars.join(' ');
    return stars;
};

// +++++++ function to help create custom tpl library links +++++++
helpers.tpl = (isbn) => {
    let tpl = `http://www.torontopubliclibrary.ca/search.jsp?Ntt=${isbn}`;
    return tpl;
};

// +++++++ function to help deal with covers unavailable on goodreads +++++++
helpers.bookcovers = (goodreadsImageURL, isbn) => {
    var newImageURL = goodreadsImageURL;
    let re = /nophoto/;
    let replaceGoodreadsWithOpenLibrary = re.exec(newImageURL);
    let largeImageURL = goodreadsImageURL.replace(/m\//g, "l/").replace(/col\//g, "com/");
    /********************************** 
    if there is no open library image for this, 
    then print out the larger goodreads image; 
    else print the open library image;
    **********************************/
    if (re.exec(replaceGoodreadsWithOpenLibrary) === null) {
        return newImageURL = largeImageURL;
    } else {
        return newImageURL = 'http://covers.openlibrary.org/b/isbn/' + parseInt(isbn) + '-L.jpg?default=false';
    }
};

// +++++++ replaces all 404 openlib images with a blank image +++++++
helpers.bookcoversBlank = () => {
    $('.bookcover').on('error', function() {
        console.log('a 404 error');
        $(this).attr('src', 'public/assets/blankcover.png');
    });
};

// +++++++ resets and deletes data in slider when user resubmits form  +++++++
helpers.resetSlider = () => {
    $('.wrapper').empty();
    // also recall all the classes from this that call to the slider
};

// +++++++ function to print all the content to page +++++++
helpers.printToPage = (grBooks) => {
    let books = grBooks.GoodreadsResponse.book;
    let title = books.title;
    let tpl = helpers.tpl(books.isbn);
    let bookcover = helpers.bookcovers(books.image_url, books.isbn);
    let description = helpers.cleanup(books.description);
    let rating = helpers.rating(books.average_rating);
    let grlink = books.link;
    // publisher - cleans up publisher in case it comes back as [object object]
    let publisher;
    let publisherIfElse = (books.publisher == '[object Object]') ?
        publisher = 'Not Available' : publisher = books.publisher;
    // makers - mapping over the author array to print all authors
    let makers = [];
    let makersIfElse = (books.authors.author.name) ?
        makers = books.authors.author.name : books.authors.author.forEach(function(person) {
            makers.push(` ${person.name}`);
        });

    let printing =
        `<p><img src="${bookcover}" class="bookcover"></p>
        <h2>${title}</h2>
        <h3>By: ${makers}</h3>
        <h4>Publisher: ${publisher}</h4>
        <p>${description}</p>
        <p><a href="${grlink}">Goodreads Rating</a></p>
        <p>${rating}</p>
        <p><a href="${tpl}">Search TPL</a></p>`;

    // print to page
    $('.wrapper').append('<div class="slide">' + printing + '</div>');
    helpers.bookcoversBlank();

};