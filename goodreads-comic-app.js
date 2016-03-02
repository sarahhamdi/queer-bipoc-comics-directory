// EMPTY OBJECT TO HOLD EVERYTHING
var myAPIProject = {}; 
myAPIProject.counter = 0;

// +++++++++++++++++++ SHEETSU API CALL +++++++++++++++++++++++++++++++++++++++
myAPIProject.endpoint = 'https://sheetsu.com/apis/14561de4'; // my api url

myAPIProject.getInfo = function() { 
	$.ajax({
		url: myAPIProject.endpoint,
		method: 'GET',
		dataType: 'json',
	}).then(function(response){
		myAPIProject.data = response;
		// console.log(response);
		myAPIProject.onSubmitHandler(); 
	}); 
}; 


// +++++++++++++++++++ EVENT HANDLER +++++++++++++++++++++++++++++++++++++
myAPIProject.onSubmitHandler = function(){

	var userInput; // empty var to hold checkbox value, pushed to array below
	var selectedFilters = []; // empty array to hold ALL checkbox values

	// ON SUBMIT BASIC FUNCTION
		$('form').on('submit', function(event){
			$('div.container').empty();
			selectedFilters = []; // empty this each time so it doesn't just keep appending data each time someone hits 'submit'
			event.preventDefault(); // prevents default page refresh on submit
			// myAPIProject.slides();
			// $('div.results h2', 'div.results h3', 'div.results p.description', 'div.results p').empty(); // empties the data in the html, to be replaced below
			$('input:checked').each(function(){
				userInput = $(this).val();
				selectedFilters.push(userInput);
		});
		// console.log(selectedFilters);


	// ALL THE DATA I CAN"T PUT IN ANOTHER FUNCTION BECAUSE I DON"T UNDERSTAND PLACEHOLDERS	
		var authorP = myAPIProject.data.result.filter(function(value){
				return value.authorPoC == 'y'; 
			});
		var authorQ = myAPIProject.data.result.filter(function(value){
				return value.authorLGBTQ == 'y'; 
			});
		var charP = myAPIProject.data.result.filter(function(value){
				return value.characterPoC == 'y';
			});
		var charQ = myAPIProject.data.result.filter(function(value){
				return value.characterLGBTQ == 'y';
			});
		var charPQ = myAPIProject.data.result.filter(function(value){
				return value.characterLGBTQ == 'y' && value.characterPoC == 'y';
			});
		var authorPQ = myAPIProject.data.result.filter(function(value){
				return value.authorPoC == 'y' && value.authorLGBTQ == 'y';
			});
		var authorPQcharP = myAPIProject.data.result.filter(function(value){
				return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterPoC == 'y';
			});
		var authorPQcharQ = myAPIProject.data.result.filter(function(value){
				return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterLGBTQ == 'y';
			});
		var authorPQcharPQ = myAPIProject.data.result.filter(function(value){
				return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
			});
		var authorPcharP = myAPIProject.data.result.filter(function(value){
				return value.authorPoC == 'y' && value.characterPoC == 'y';
			});
		var authorPcharQ = myAPIProject.data.result.filter(function(value){
				return value.authorPoC == 'y' && value.characterLGBTQ == 'y';
			});
		var authorPcharPQ = myAPIProject.data.result.filter(function(value){
				return value.authorPoC == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
			});
		var authorQcharP = myAPIProject.data.result.filter(function(value){
				return value.authorLGBTQ == 'y' && value.characterPoC == 'y';
			});
		var authorQcharQ = myAPIProject.data.result.filter(function(value){
				return value.authorLGBTQ == 'y' && value.characterLGBTQ == 'y';
			});
		var authorQcharPQ = myAPIProject.data.result.filter(function(value){
				return value.authorLGBTQ == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
			});

	// A GIANT UGLY IF/ELSE STATEMENT - will replace this with an _.each statement in the future

		if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ' 
			&& selectedFilters[2] == 'characterPoC' 
			&& selectedFilters[3] == 'characterLGBTQ') {
				_.each(authorPQcharPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
					// console.log(selectedBook);
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ' 
			&& selectedFilters[2] == 'characterPoC') {
				_.each(authorPQcharP, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				_.each(authorPQcharQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterPoC' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				_.each(authorPcharPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				});
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterPoC' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				_.each(authorQcharPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterPoC') {
				_.each(authorPcharP, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				_.each(authorPcharQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				});
		} else if (selectedFilters[0] == 'authorPoC'
			&& selectedFilters[1] == 'authorLGBTQ') {
				_.each(authorPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				}); 
		} else if (selectedFilters[0] == 'characterPoC' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				_.each(charPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				}); 
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterPoC') {
				_.each(authorQcharP, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				}); 
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				_.each(authorQcharQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
					// console.log(myAPIProject.counter);
				}); 
		} else if (selectedFilters[0] == 'authorPoC') {
			_.each(authorP, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
					// console.log(myAPIProject.counter);
			});
		} else if (selectedFilters[0] == 'authorLGBTQ') {
			_.each(authorQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
					// console.log(myAPIProject.counter);
			});
		} else if (selectedFilters[0] == 'characterPoC') {
			_.each(charP, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
					// console.log(myAPIProject.counter);
			});
		} else if (selectedFilters[0] == 'characterLGBTQ') {
			_.each(charQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
					// console.log(myAPIProject.counter);
			});
		}; // end of if/else statement

	}); // end of form submit

}; // end of function - myAPIProject.onSubmitHandler()


// ++++++++++++++++++++++ PRINT ITEMS TO PAGE CALLED LATER BELOW ++++++++++++
myAPIProject.printToPage = function(books, selectedBook, string){

	// replaces rating with stars
	var rating = parseInt(books.GoodreadsResponse.book.average_rating); 
	var stars = [];
	  for (m = 0; m < rating; m++) {
	      stars.push('<img src="assets/star.svg">');
	  }
	  stars = stars.join(" ");

	// cleans up the data from the goodreads descriptons 
	var cleanup = function(string) { 
			return string.replace(/&lt;\/*[a-z]*&gt;/g, " ").replace(/&amp;/g, "&");
		}
	var imageURL = books.GoodreadsResponse.book.image_url;
	var re = /nophoto/;
	var replaceGoodreadsWithOpenLibrary = re.exec(imageURL);
	var tpl = 'http://www.torontopubliclibrary.ca/search.jsp?advancedSearch=true&Ntt=';
	var bookTitle = books.GoodreadsResponse.book.title;
	var bookTitleWithPluses = bookTitle.split(" ");
	var bookTitleWithPluses = bookTitleWithPluses.join('+');
	var smallGoodreadsImage = books.GoodreadsResponse.book.image_url;

	// smooth scroll
	// $('html, body').animate ({
	// 	scrollTop: $("#submit").offset().top
	// },500);

	// returns larger images from goodreads
	function findLetter(substring, smallGoodreadsImage){
	  var a = [], i = -1;
	  while((i = smallGoodreadsImage.indexOf(substring, i+1)) >=0) a.push(i);
	  var secondLetterIndex = a[1];
	  return secondLetterIndex;
	}
	var mIndex = findLetter('m', smallGoodreadsImage);
	var wordArray = smallGoodreadsImage.split("");
	var largerGoodreadsImageFixed = wordArray.map(function(val, i) {
		if (i === mIndex) {
			return val = 'l'
		} else {
			return val
		}
	}).join('');
	
	// book results
	$('div.container').css({'display':'block'});
	// $('div.results').css({"display":"flex"});

	// replaces nonexistant goodreads images with openlibrary imaages
	var bookReturn = {
		title: (books.GoodreadsResponse.book.title),
		author: 'By: ' + selectedBook.author,
		publisher: 'Publisher: ' + books.GoodreadsResponse.book.publisher,
		description: cleanup(books.GoodreadsResponse.book.description),
		stars: stars,
		goodreadsLink: books.GoodreadsResponse.book.url,
		tpl: tpl + bookTitleWithPluses,
		imageUrl: 'assets/blankcover.png',
		listID: 'item-' + myAPIProject.counter
	};
	var myTemplate = $('#myTemplate').html();
	var template = Handlebars.compile(myTemplate);

	if (re.exec(replaceGoodreadsWithOpenLibrary) == null) {

		bookReturn.imageUrl = largerGoodreadsImageFixed

	} else if (('http://covers.openlibrary.org/b/isbn/' + books.GoodreadsResponse.book.isbn + '-L.jpg') !== 'http://covers.openlibrary.org/b/isbn/[object Object]-L.jpg') {

		bookReturn.imageUrl = 'http://covers.openlibrary.org/b/isbn/' + books.GoodreadsResponse.book.isbn + '-L.jpg';

	}

	$('div.container').append(template(bookReturn));

}


// +++++++++++++++++++++ GOODREADS API / HY PROXY +++++++++++++++++++++++++++++++++++

myAPIProject.goodreadsAPI = {}; // empty object to store all the goodreads API info
myAPIProject.goodreadsAPI.endpoint = 'https://www.goodreads.com/book/title.xml';
myAPIProject.goodreadsAPI.key = 'AYoaCzPGXisCTWsP6Ainw'

myAPIProject.goodreadsAPI.getBooks = function(selectedBook) {
		$.ajax({
		url: 'http://proxy.hackeryou.com',
		dataType: 'json',
		method: 'GET',
		data: {  
			reqUrl: myAPIProject.goodreadsAPI.endpoint, 
			params: { 
				key: myAPIProject.goodreadsAPI.key,
				title: selectedBook.bookTitle
			},
			xmlToJSON: true
		}
	}).then(function(books) {
		// console.log(books);
		$('div.container').append(myAPIProject.printToPage(books, selectedBook));
		myAPIProject.slides();

	});
};


myAPIProject.slides = function(){
    $('#slides').slidesjs({
    width: 940,
    height: 528,
    navigation: {
      effect: "fade"
    },
    pagination: {
      effect: "fade"
    },
    effect: {
      fade: {
        speed: 400
      }
    }
  });
 };

$(function(){
	myAPIProject.getInfo();

});
