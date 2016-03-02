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
		console.log(myAPIProject.data);
		myAPIProject.filteringBooks(response);
		myAPIProject.onSubmitHandler(); 
	}); 
}; 




myAPIProject.selectedFilters = []; 

 // ++++++EVENT HANDLER +++++++++++++++++++

myAPIProject.onSubmitHandler = function(){
	// ON SUBMIT BASIC FUNCTION
		$('form').on('submit', function(event){
			var userInput;
			myAPIProject.selectedFilters = [];
			event.preventDefault();
			$('input:checked').each(function(){
				myAPIProject.userInput = $(this).val();
				myAPIProject.selectedFilters.push(userInput);
		});
		myAPIProject.giantIfElseStatement();
		// myAPIProject.printToPage();
	}); // end of form submit

}; // end of function - myAPIProject.onSubmitHandler()

myAPIProject.giantIfElseStatement = function(correctValues){

	myAPIProject.filteringBooks();

	if (myAPIProject.selectedFilters[0] == 'authorPoC' 
		&& myAPIProject.myAPIProject.selectedFilters[1] == 'authorLGBTQ' 
		&& myAPIProject.myAPIProject.selectedFilters[2] == 'characterPoC' 
		&& myAPIProject.myAPIProject.selectedFilters[3] == 'characterLGBTQ') {
			_.each(authorPQcharPQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
				console.log(selectedBook);
			});
	} else if (myAPIProject.selectedFilters[0] == 'authorPoC' 
		&& myAPIProject.selectedFilters[1] == 'authorLGBTQ' 
		&& myAPIProject.selectedFilters[2] == 'characterPoC') {
			_.each(authorPQcharP, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			});
	} else if (myAPIProject.selectedFilters[0] == 'authorPoC' 
		&& myAPIProject.selectedFilters[1] == 'authorLGBTQ' 
		&& myAPIProject.selectedFilters[2] == 'characterLGBTQ') {
			_.each(authorPQcharQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			});
	} else if (myAPIProject.selectedFilters[0] == 'authorPoC' 
		&& myAPIProject.selectedFilters[1] == 'characterPoC' 
		&& myAPIProject.selectedFilters[2] == 'characterLGBTQ') {
			_.each(authorPcharPQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			});
	} else if (myAPIProject.selectedFilters[0] == 'authorLGBTQ' 
		&& myAPIProject.selectedFilters[1] == 'characterPoC' 
		&& myAPIProject.selectedFilters[2] == 'characterLGBTQ') {
			_.each(authorQcharPQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			});
	} else if (myAPIProject.selectedFilters[0] == 'authorPoC' 
		&& myAPIProject.selectedFilters[1] == 'characterPoC') {
			_.each(authorPcharP, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			});
	} else if (myAPIProject.selectedFilters[0] == 'authorPoC' 
		&& myAPIProject.selectedFilters[1] == 'characterLGBTQ') {
			_.each(authorPcharQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			});
	} else if (myAPIProject.selectedFilters[0] == 'authorPoC'
		&& myAPIProject.selectedFilters[1] == 'authorLGBTQ') {
			_.each(authorPQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			}); 
	} else if (myAPIProject.selectedFilters[0] == 'characterPoC' 
		&& myAPIProject.selectedFilters[1] == 'characterLGBTQ') {
			_.each(charPQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			}); 
	} else if (myAPIProject.selectedFilters[0] == 'authorLGBTQ' 
		&& myAPIProject.selectedFilters[1] == 'characterPoC') {
			_.each(authorQcharP, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			}); 
	} else if (myAPIProject.selectedFilters[0] == 'authorLGBTQ' 
		&& myAPIProject.selectedFilters[1] == 'characterLGBTQ') {
			_.each(authorQcharQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
				console.log(myAPIProject.counter);
			}); 
	} else if (myAPIProject.selectedFilters[0] == 'authorPoC') {
		_.each(authorP, function(selectedBook){
			myAPIProject.goodreadsAPI.getBooks(selectedBook);
			myAPIProject.counter++;
				console.log(myAPIProject.counter);
		});
	} else if (myAPIProject.selectedFilters[0] == 'authorLGBTQ') {
		_.each(authorQ, function(selectedBook){
			myAPIProject.goodreadsAPI.getBooks(selectedBook);
			myAPIProject.counter++;
				console.log(myAPIProject.counter);
		});
	} else if (myAPIProject.selectedFilters[0] == 'characterPoC') {
		_.each(charP, function(selectedBook){
			myAPIProject.goodreadsAPI.getBooks(selectedBook);
			myAPIProject.counter++;
				console.log(myAPIProject.counter);
		});
	} else if (myAPIProject.selectedFilters[0] == 'characterLGBTQ') {
		_.each(charQ, function(selectedBook){
			myAPIProject.goodreadsAPI.getBooks(selectedBook);
			myAPIProject.counter++;
				console.log(myAPIProject.counter);
		});
	}; // end of if/else statement
}

myAPIProject.filteringBooks = {

	authorP: myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y'; 
		}),
	authorQ: myAPIProject.data.result.filter(function(value){
			return value.authorLGBTQ == 'y'; 
		}),
	charP: myAPIProject.data.result.filter(function(value){
			return value.characterPoC == 'y';
		}),
	charQ: myAPIProject.data.result.filter(function(value){
			return value.characterLGBTQ == 'y';
		}),
	charPQ: myAPIProject.data.result.filter(function(value){
			return value.characterLGBTQ == 'y' && value.characterPoC == 'y';
		}),
	authorPQ: myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.authorLGBTQ == 'y';
		}),
	authorPQcharP: myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterPoC == 'y';
		}),
	authorPQcharQ: myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterLGBTQ == 'y';
		}),
	authorPQcharPQ: myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
		}),
	authorPcharP: myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.characterPoC == 'y';
		}),
	authorPcharQ: myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.characterLGBTQ == 'y';
		}),
	authorPcharPQ: myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
		}),
	authorQcharP: myAPIProject.data.result.filter(function(value){
			return value.authorLGBTQ == 'y' && value.characterPoC == 'y';
		}),
	authorQcharQ: myAPIProject.data.result.filter(function(value){
			return value.authorLGBTQ == 'y' && value.characterLGBTQ == 'y';
		}),
	authorQcharPQ: myAPIProject.data.result.filter(function(value){
			return value.authorLGBTQ == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
		})
};

// +++++++ PRINT ITEMS TO PAGE CALLED LATER BELOW ++++++++++++
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
	
	// replaces nonexistant goodreads images with openlibrary imaages
	if (re.exec(replaceGoodreadsWithOpenLibrary) == null) {
		$('div.image').addClass('thingy' + myAPIProject.counter +'');
		var tempHolder = $('div.image.thingy' + myAPIProject.counter + ' img').attr('src', largerGoodreadsImageFixed);
		$('div.container').append('div.results').append(tempHolder)
	} else if (('http://covers.openlibrary.org/b/isbn/' + books.GoodreadsResponse.book.isbn + '-L.jpg') == 'http://covers.openlibrary.org/b/isbn/[object Object]-L.jpg') {
		$('div.image').addClass('thingy' + myAPIProject.counter +'');
		var tempHolder = $('div.image.thingy' + myAPIProject.counter + ' img').attr('src', 'assets/blankcover.png');
		$('div.container').append(tempholder)
	} else {
		$('div.image').addClass('thingy' + myAPIProject.counter +'');
		var tempHolder = $('div.image.thingy' + myAPIProject.counter + ' img').attr('src', 'http://covers.openlibrary.org/b/isbn/' + books.GoodreadsResponse.book.isbn + '-L.jpg');
		$('div.container').append(tempholder)
	}

	// book results
	$('div.container').css({'display':'block'});
	$('div.results').css({"display":"flex"});

	var myTemplate = $('#myTemplate').html();
	var template = Handlebars.compile(myTemplate);

	var bookReturn = {
		// title: (books.GoodreadsResponse.book.title),
		// author: 'By: ' + selectedBook.author,
		// publisher: 'Publisher: ' + books.GoodreadsResponse.book.publisher,
		// description: cleanup(books.GoodreadsResponse.book.description),
		// stars: stars,
		// tpl: tpl + bookTitleWithPluses
	};

	console.log(stars);
	// var bookTemplate = template(bookReturn);
	// $('div.container').append(template());

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
		console.log(books);
		$('div.container').append(myAPIProject.printToPage(books, selectedBook));
	});
};


// myAPIProject.slides = function(){
// 	$("#slides").slidesjs({
// 	      width: '100%'
// 	      // height: 528
// 	});
// };

$(function(){
	myAPIProject.getInfo();
});
