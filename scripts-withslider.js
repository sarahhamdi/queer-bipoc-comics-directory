// EMPTY OBJECT TO HOLD EVERYTHING
var myAPIProject = {}; 
var deferred = new $.Deferred();
var promise = deferred.promise();
var template;
myAPIProject.counter = 0;

// ++++++++ SHEETSU API CALL +++++++++++++++++++++++++++
myAPIProject.endpoint = 'https://sheetsu.com/apis/14561de4';

myAPIProject.getSheetsuAPIInfo = function() { 
	$.ajax({
		url: myAPIProject.endpoint,
		method: 'GET',
		dataType: 'json',
	}).then(function(response){
		myAPIProject.data = response;
		myAPIProject.onSubmitHandler();
	}); // end of Sheetsu AJAX call
}; // end of function


// ++++++++++ GOODREADS API / HackerYou PROXY ++++++++++++++
// empty object to store all the goodreads API info
myAPIProject.goodreadsAPI = {}; 
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
		$('div.container').append(myAPIProject.printToPage(books, selectedBook))
		});

	//}; // end of Goodreads AJAX call
}; // end of function


// +++++++++ EVENT HANDLER ++++++++++++++++++++++
myAPIProject.onSubmitHandler = function(){

	// empty var to hold checkbox value, pushed to array selectedFilters, below
	var userInput; 
	// empty array to hold ALL checkbox values
	var selectedFilters = []; 

	// ON SUBMIT BASIC FUNCTION
		$('form').on('submit', function(event){
			$('div.container').empty();
			// empty array each time so it doesn't just keep appending data each time someone hits 'submit'
			selectedFilters = []; 
			// prevents default page refresh on submit
			event.preventDefault(); 
			$('input:checked').each(function(){
				userInput = $(this).val();
				selectedFilters.push(userInput);
		});

		myAPIProject.datafilters(selectedFilters);

	}); // end of on submit function

}; // end of function onSubmitHandler

// ++++++++++ FILTERING BOOKS + RETURNING CORRECT ONES ++++++++++++++
myAPIProject.datafilters = function (selectedFilters){
	// this data filters through all the info in  Sheetsu and returns the values that match specific conditions. To be used to display results based on user prefs.
	myAPIProject.authorP = myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y'; 
		});
	myAPIProject.authorQ = myAPIProject.data.result.filter(function(value){
			return value.authorLGBTQ == 'y'; 
		});
	myAPIProject.charP = myAPIProject.data.result.filter(function(value){
			return value.characterPoC == 'y';
		});
	myAPIProject.charQ = myAPIProject.data.result.filter(function(value){
			return value.characterLGBTQ == 'y';
		});
	myAPIProject.charPQ = myAPIProject.data.result.filter(function(value){
			return value.characterLGBTQ == 'y' && value.characterPoC == 'y';
		});
	myAPIProject.authorPQ = myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.authorLGBTQ == 'y';
		});
	myAPIProject.authorPQcharP = myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterPoC == 'y';
		});
	myAPIProject.authorPQcharQ = myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterLGBTQ == 'y';
		});
	myAPIProject.authorPQcharPQ = myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.authorLGBTQ == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
		});
	myAPIProject.authorPcharP = myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.characterPoC == 'y';
		});
	myAPIProject.authorPcharQ = myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.characterLGBTQ == 'y';
		});
	myAPIProject.authorPcharPQ = myAPIProject.data.result.filter(function(value){
			return value.authorPoC == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
		});
	myAPIProject.authorQcharP = myAPIProject.data.result.filter(function(value){
			return value.authorLGBTQ == 'y' && value.characterPoC == 'y';
		});
	myAPIProject.authorQcharQ = myAPIProject.data.result.filter(function(value){
			return value.authorLGBTQ == 'y' && value.characterLGBTQ == 'y';
		});
	myAPIProject.authorQcharPQ = myAPIProject.data.result.filter(function(value){
			return value.authorLGBTQ == 'y' && value.characterPoC == 'y' && value.characterLGBTQ == 'y';
		});

	myAPIProject.giantIfElseStatement(selectedFilters);
};


// ++++++++++ GIANT IF/ELSE STATEMENT TO DETERMIN WHICH BOOK TO DISPLAY BASED ON USER PREFS ++++++++++++++

myAPIProject.giantIfElseStatement = function(selectedFilters){
	// A GIANT UGLY IF/ELSE STATEMENT - will replace this with an _.each statement in the future
	// if/else statement used to determine which 
		if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ' 
			&& selectedFilters[2] == 'characterPoC' 
			&& selectedFilters[3] == 'characterLGBTQ') {
				_.each(myAPIProject.authorPQcharPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					// adds to counter for each book found that matches criteria above
					// counter is used to give each book cover (div.imag)e a unique id
					/// unique ID allows it to display only once, and not append repeatedly
					myAPIProject.counter++;
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ' 
			&& selectedFilters[2] == 'characterPoC') {
				_.each(myAPIProject.authorPQcharP, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				_.each(myAPIProject.authorPQcharQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterPoC' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				_.each(myAPIProject.authorPcharPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				});
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterPoC' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				_.each(myAPIProject.authorQcharPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterPoC') {
				_.each(myAPIProject.authorPcharP, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				});
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				_.each(myAPIProject.authorPcharQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				});
		} else if (selectedFilters[0] == 'authorPoC'
			&& selectedFilters[1] == 'authorLGBTQ') {
				_.each(myAPIProject.authorPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				}); 
		} else if (selectedFilters[0] == 'characterPoC' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				_.each(myAPIProject.charPQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				}); 
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterPoC') {
				_.each(myAPIProject.authorQcharP, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				}); 
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				_.each(myAPIProject.authorQcharQ, function(selectedBook){
					myAPIProject.goodreadsAPI.getBooks(selectedBook);
					myAPIProject.counter++;
				}); 
		} else if (selectedFilters[0] == 'authorPoC') {
			_.each(myAPIProject.authorP, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
			});
		} else if (selectedFilters[0] == 'authorLGBTQ') {
			_.each(myAPIProject.authorQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
			});
		} else if (selectedFilters[0] == 'characterPoC') {
			_.each(myAPIProject.charP, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
			});
		} else if (selectedFilters[0] == 'characterLGBTQ') {
			_.each(myAPIProject.charQ, function(selectedBook){
				myAPIProject.goodreadsAPI.getBooks(selectedBook);
				myAPIProject.counter++;
			});
		}; // end of if/else statement
}; // end of function - myAPIProject.onSubmitHandler()


// +++++++++++ PRINT ITEMS TO PAGE CALLED LATER BELOW ++++++++++++

myAPIProject.printToPage = function(books, selectedBook, string){

	// replaces goodreads rating with svg stars
	var rating = parseInt(books.GoodreadsResponse.book.average_rating); 
	var stars = [];
	  for (m = 0; m < rating; m++) {
	      stars.push('<img src="assets/star.svg">');
	  }
	  stars = stars.join(" ");

	// cleans up weird characters in the goodreads book descriptons 
	var cleanup = function(string) { 
			return string.replace(/&lt;\/*[a-z]*&gt;/g, " ").replace(/&amp;/g, "&");
		}
	
	// variables to help create custom library links, using regex
	var bookTitle = books.GoodreadsResponse.book.title;
	var bookTitleWithPluses = bookTitle.split(" ");
	var bookTitleWithPluses = bookTitleWithPluses.join('+');
	var tpl = 'http://www.torontopubliclibrary.ca/search.jsp?advancedSearch=true&Ntt=';

	// variables to help with dealing with missing images, if/else statement below
	var imageURL = books.GoodreadsResponse.book.image_url;
	var re = /nophoto/;
	var replaceGoodreadsWithOpenLibrary = re.exec(imageURL);
	var smallGoodreadsImage = books.GoodreadsResponse.book.image_url;

	// BOOK COVERS 1 - function to return larger book covers from goodreads instead of smaller defaults
	function findLetter(substring, smallGoodreadsImage){
	  var a = [], i = -1;
	  while((i = smallGoodreadsImage.indexOf(substring, i+1)) >= 0) a.push(i);
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

	// HANDLEBARS TEMPLATE - print book results to page
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
	template = Handlebars.compile(myTemplate);

	// BOOK COVERS 2 - if no Open Library book cover exists, this if/else runs 
	// it will return a large Goodreads book cover, using variable from function above
	// if no Goodreads cover exists, will return a blank cover image from assets
	if (re.exec(replaceGoodreadsWithOpenLibrary) == null) {
		bookReturn.imageUrl = largerGoodreadsImageFixed;
	} else if (('http://covers.openlibrary.org/b/isbn/' + books.GoodreadsResponse.book.isbn + '-L.jpg') !== 'http://covers.openlibrary.org/b/isbn/[object Object]-L.jpg') {
		bookReturn.imageUrl = 'http://covers.openlibrary.org/b/isbn/' + books.GoodreadsResponse.book.isbn + '-L.jpg';
	}

		$('div.container').append(template(bookReturn));

		// timer for the slider
		setTimeout(function(){
			myAPIProject.slider();
			$('div.container').toggleClass('hide show');
			$('div.results').toggleClass('hide show');

		}, 8000);
};

myAPIProject.slider = function(){
	$("#slides").slidesjs({
	})
};



myAPIProject.submitFormThankYouAppear = function() {
	if (document.URL == 'http://localhost:3000/#thankyou') {
		$('aside#form-thank-you').css('display', 'block');
	} else {
		$('aside#form-thank-you').css('display', 'none');
	}
};


myAPIProject.init = function(){

	// $("button").on( "click", function() {

	//   $.when( myAPIProject.getSheetsuAPIInfo() ).done(function() {
	    	
	//     	$(function(){
	//     	      $("#slides").slidesjs({
	//     	        width: 940,
	//     	        height: 528
	//     	      });
	//     	});
	//  	});

	// });
myAPIProject.getSheetsuAPIInfo();
myAPIProject.submitFormThankYouAppear();

	$(function() {
		  $('a[href*="#"]:not([href="#"])').click(function() {
		    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		      var target = $(this.hash);
		      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		      if (target.length) {
		        $('html, body').animate({
		          scrollTop: target.offset().top
		        }, 1000);
		        return false;
		      }
		    }
		  });
		});
			
}





// +++++++ DOCUMENT READY +++++++++++++++++++++

$(function(){

	  		myAPIProject.init();

	});	

