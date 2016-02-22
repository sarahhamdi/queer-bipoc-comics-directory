// EMPTY OBJECT TO HOLD EVERYTHING
var myAPIProject = {}; 

myAPIProject.endpoint = 'https://sheetsu.com/apis/14561de4'; // my api url

myAPIProject.getInfo = function() { // access api information from sheetsu, and will pass this into init
	$.ajax({
		url: myAPIProject.endpoint,
		method: 'GET',
		dataType: 'json',
	}).then(function(response){
		myAPIProject.data = response;
		myAPIProject.onSubmitHandler(); // calls the onSubmit in here so it can access this data??
	}); // end of AJAX call
}; // end of getInfo function


// ON SUBMIT GIANT METHOD
myAPIProject.onSubmitHandler = function(){

	var userInput; // empty var to hold checkbox value, pushed to array below
	var selectedFilters = []; // empty array to hold ALL checkbox values

	// ON SUBMIT BASIC FUNCTION
		$('form').on('submit', function(event){
			
			selectedFilters = []; // empty this each time so it doesn't just keep appending data each time someone hits 'submit'
			event.preventDefault(); // prevents default page refresh on submit
			$('div.results h2', 'div.results h3', 'div.results p.description', 'div.results p').empty(); // empties the data in the html, to be replaced below
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
				var randomBook = _.sample(authorPQcharPQ);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ' 
			&& selectedFilters[2] == 'characterPoC') {
				var randomBook = _.sample(authorPQcharP);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				var randomBook = _.sample(authorPQcharQ);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterPoC' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				var randomBook = _.sample(authorPcharPQ);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterPoC' 
			&& selectedFilters[2] == 'characterLGBTQ') {
				var randomBook = _.sample(authorQcharPQ);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterPoC') {
				var randomBook = _.sample(authorPcharP);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				var randomBook = _.sample(authorPcharQ);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorPoC' 
			&& selectedFilters[1] == 'authorLGBTQ') {
				var randomBook = _.sample(authorPQ);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'characterPoC' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				var randomBook = _.sample(charPQ);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterPoC') {
				var randomBook = _.sample(authorQcharP);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorLGBTQ' 
			&& selectedFilters[1] == 'characterLGBTQ') {
				var randomBook = _.sample(authorQcharQ);
				myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'authorPoC') {
			var randomBook = _.sample(authorP);
			myAPIProject.goodreadsAPI.getBooks(randomBook);
			// myAPIProject.goodreadsAPI.getBooks(value);
			// authorP.forEach(function(value){
			// });
		} else if (selectedFilters[0] == 'authorLGBTQ') {
			var randomBook = _.sample(authorQ);
			myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'characterPoC') {
			var randomBook = _.sample(charP);
			myAPIProject.goodreadsAPI.getBooks(randomBook);
		} else if (selectedFilters[0] == 'characterLGBTQ') {
			var randomBook = _.sample(charQ);
			myAPIProject.goodreadsAPI.getBooks(randomBook);
		}; // end of if/else statement

	}); // end of form submit

}; // end of function - myAPIProject.onSubmitHandler()


// GOODREADS API

myAPIProject.goodreadsAPI = {}; // empty object to store all the goodreads API info

myAPIProject.goodreadsAPI.endpoint = 'https://www.goodreads.com/book/title.xml';
myAPIProject.goodreadsAPI.key = 'AYoaCzPGXisCTWsP6Ainw'
myAPIProject.goodreadsAPI.getBooks = function(randomBook) {


		$.ajax({
		url: 'http://proxy.hackeryou.com', // send the initial request through the HY proxy app because the endpoint returns XML. We need to mask the URL through another.
		dataType: 'json',
		method: 'GET',
		data: { // This is where we pass in info regarding the endpoint we want to use. 
			reqUrl: myAPIProject.goodreadsAPI.endpoint, // Put API endpoint here
			params: { // act as a query string ie. data property in jquery
				key: myAPIProject.goodreadsAPI.key,
				title: randomBook.bookTitle
			},
			xmlToJSON: true
		}
	}).then(function(books) {


		var cleanup = function(string) { // cleans up the data from the goodreads descriptons 
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


		// replaces rating with stars
		var rating = parseInt(books.GoodreadsResponse.book.average_rating); // turns gallery satisfaction rating into a number and not a string
		var stars = [];
		  for (m = 0; m < rating; m++) {
		      stars.push('<img src="assets/star.svg">');
		  }
		  stars = stars.join(" ");
		  // console.log(stars);


		// replaces nonexistant goodreads images with openlibrary imaages
		if (re.exec(replaceGoodreadsWithOpenLibrary) == null) {
			$('div.image img').attr('src', largerGoodreadsImageFixed);
		} else if (('http://covers.openlibrary.org/b/isbn/' + books.GoodreadsResponse.book.isbn + '-L.jpg') == 'http://covers.openlibrary.org/b/isbn/[object Object]-L.jpg') {
			$('div.image img').attr('src', 'assets/blankcover.png');
		} else {
			$('div.image img').attr('src', 'http://covers.openlibrary.org/b/isbn/' + books.GoodreadsResponse.book.isbn + '-L.jpg');
		}

		// prints one random result to page
		$('div.results').css({"display":"flex"});
		$('div.results h2').html(books.GoodreadsResponse.book.title);
		$('div.results h3').html('By: ' + randomBook.author);
		$('div.results p.publisher').html('Publisher: ' + books.GoodreadsResponse.book.publisher);
		$('div.results p.description').html(cleanup(books.GoodreadsResponse.book.description));
		$('div.results p.stars').html(stars);
		$('div.button a.library').attr('href', tpl + bookTitleWithPluses).attr('target', 'blank');
		$('#submit').attr('value', 'Find Another Comic')

		// smooth scroll
		$('html, body').animate ({
						scrollTop: $("#submit").offset().top
						},500);

	});
};

$(function(){
	myAPIProject.getInfo();
});
