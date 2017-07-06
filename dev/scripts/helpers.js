/*jshint esversion: 6 */

let helpers = {};

// +++++++ cleans up goodreads book descriptons +++++++
helpers.cleanup = (description) => {
    let emptyDesc = "Description not available, sorry! It's probably 🔥 though."
    let cleanDesc = String(description);
    // cleans up weird characters
    cleanDesc = helpers.replaceWeirdChars(cleanDesc);
    cleanDesc = helpers.truncateDesc(cleanDesc);
    /********************************** 
    if there is no description for this book (object Object)
    then replace the description with a message
    else truncate the description before it is printed
    **********************************/
    if  (cleanDesc == "[object Object]")
        return cleanDesc = emptyDesc; 
        return cleanDesc;
};

// +++++++ cleans up weird/html characters in large amounts of text +++++++
helpers.replaceWeirdChars = (string) => {
    return string.replace(/&lt;\/*[a-z]*&gt;/g, "").replace(/&amp;/g, "&").replace(/&lt;br \/&gt;/g, " ").replace(/<br \/>/g, " ")
}

// +++++++ cleans up weird/html characters in large amounts of text +++++++
helpers.truncateDesc = (string) => {
    if (string.length > 600)
        return `${string.slice(0, 600)} ...`;
        return string;
}

// +++++++ replaces goodreads rating with svg stars +++++++
helpers.rating = (bookRating) => {
    let stars = [];
    let intRating = parseInt(bookRating);
    for (let m = 0; m < intRating; m++) {
        stars.push('<img class="star" src="public/assets/star.svg">');
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
    if (re.exec(replaceGoodreadsWithOpenLibrary) === null) 
        return newImageURL = largeImageURL;
        return newImageURL = 'http://covers.openlibrary.org/b/isbn/' + parseInt(isbn) + '-L.jpg?default=false';
};

// +++++++ replaces all 404 openlib images with a blank image +++++++
helpers.bookcoversBlank = () => {
    $('.bookcover').on('error', function() {
        console.log('a 404 error');
        $(this).attr('src', 'public/assets/blankcover.png');
    });
};

// +++++++ initializes slider +++++++++++
helpers.initSlider = () => {
    
    let arraylength = sheetsu.filteredBooks.length - 1;
    // increments the index until it reaches length of results array
    // when that happens, initates slider (since all content is now loaded)
    if (generic.index == arraylength) {
        console.log('last book');
        let mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            pagination: '.swiper-pagination',
            paginationClickable: true,
            loop: true,
            paginationBulletRender: function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';}
        }); 
    } else {
        generic.index++;
    }
};

// +++++++ resets and deletes data in slider when user resubmits form  +++++++
helpers.resetSlider = () => {
    $('#wrapper').empty();
    $('.swiper-pagination').empty();
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
        `<p class="flex-item-1">
            <img src="${bookcover}" class="bookcover">
        </p>
        <div class="flex-item-2">
            <h2 class="results-title">${title}</h2>
            <h3>By: ${makers}</h3>
            <h4>Publisher: ${publisher}</h4>
            <p class="results-description">${description}</p>
            <p class="results-link"><a href="${grlink}">Goodreads Rating</a></p>
            <p>${rating}</p>
            <p><a href="${tpl}"><img src="public/assets/tpl-logo.png" class="tpl"></a></p>
        </div>`;

    // print to page
    $('#wrapper').append('<div class="swiper-slide">' + printing + '</div>').addClass('swiper-wrapper');
    $('#container').addClass('swiper-container');
    $('#pagination').addClass('swiper-pagination');
    helpers.bookcoversBlank();
    

};