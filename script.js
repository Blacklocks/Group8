//======================================================================
/*
Name:     Caleb Del Rosario (u3190431) & Jason Wood (u3075794) & Caleb Dhaliwal-McLeod - (u3199647)
File:     script.js
Date:     16/10/2020
Purpose:  JavaScript file used to retrieve ISBN of books and display
          relevant data
*/
//======================================================================

var bookTitle = ""; // global book title variable used for searching movies
var valid = true;


function retrieveISBN(){
  validateISBN(document.getElementById("inputISBN").value);
  if (valid==false) return; //if returns false exits search function
  document.getElementById("outputMovie").innerHTML = "";
  // Retrieves information on book from ISBN entered into textbox after pressing button
  // Caleb Notes: Had to use Search API, regular ISBN API did not work as intended. Content loading is very slow, so patience is needed. 
  document.getElementById("outputISBN").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
  fetch("https://openlibrary.org/search.json?q=" + document.getElementById("inputISBN").value).then(a => a.json()).then(response => {
      // Goes through ISBN response and outputs title, author, year and cover image
      // There is not much relevant/interesting data available to output, most data associated to books is related to various ID
      for(var i = 0; i < response.docs.length; i++) { 
        document.getElementById("outputISBN").innerHTML += 
        "<h2 class ='a'>" + response.docs[i].title + " - " + response.docs[i].author_name[0] + "</h2>" +
        "<p class ='a'>Original Publish Date: " + response.docs[i].first_publish_year + "</p>" +
        "<br><img src = 'http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";

        bookTitle = response.docs[i].title; // Sets bookTitle to be used in movie search
        retrieveMovie(bookTitle);
      }
    }
  );
  document.getElementById("outputISBN").innerHTML = "";
}

// Input validation that checks length of entered text and checks for only numeric values. 
// If the length of the ISBN isn't 10 or 13 characters long or not a number, then it will display an error message.
function validateISBN(x){
  var testISBN = x;
  if ((testISBN.length == 10 || testISBN.length == 13) && isNaN(testISBN) == false) {
    document.getElementById("testISBN").innerHTML = "<p class ='a'>" + testISBN + "</p>";
    valid =true;
  } else {
    document.getElementById("testISBN").innerHTML = "<p class ='a'>Entered text is not a valid ISBN</p>";
    valid = false;
  }
}
//Checks if array is accesible and outputs string if true
function arrayread(){
  if (typeof isbnlist != undefined)document.getElementById("arrayRead").innerHTML = "<p class = 'a'>ISBNs read from file:</p>";
  }

// Retrieves isbnlist array from isbn.js file and associates each item in array to a button
function printISBNbtn() {
  document.getElementById("isbnArrBtn").innerHTML
  for (var i = 0; i < isbnlist.length; i++) {
    var id = isbnlist[i];
    var btn = document.createElement("button");
    var t = document.createTextNode(isbnlist[i]);
    btn.value = isbnlist[i];
    // Immediately invoked function expression used for button creation to enable global access to buttons and associated values   
    btn.onclick = (function(id) {   
      return function() {
        retrieveISBNbutton(id);
        validateISBN(id);
        if (validateISBN()){return;} 
      }
    })(id);
    btn.appendChild(t);
    isbnArrBtn.appendChild(btn);
  }
}

// Retrieves information on book from ISBN associated to button after it is pressed - Alteration of retrieveISBN code
function retrieveISBNbutton(x){
  document.getElementById("outputMovie").innerHTML = "";
  fetch("https://openlibrary.org/search.json?q=" + x).then(a => a.json()).then(response => {
      // Goes through ISBN response and outputs title, author, year and cover image
      // There is not much relevant/interesting data available to output, most data associated to books is related to various ID
      for(var i = 0; i < response.docs.length; i++) { 
        document.getElementById("outputISBN").innerHTML += 
        "<h2 class ='a'>" + response.docs[i].title + " - " + response.docs[i].author_name[0] + "</h2>" +
        "<p class ='a'>Original Publish Date: " + response.docs[i].first_publish_year + "</p>" +
        "<br><img src = 'http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";

        bookTitle = response.docs[i].title; // Sets bookTitle to be used in movie search
        retrieveMovie(bookTitle);
      }
    }
  );
  // Resets list so it only shows current results instead of concatenate old and new results
  document.getElementById("outputISBN").innerHTML = ""; 
}

// Searches movie database for book title then returns link to moviedb for relevant movies or output if no movies found 
// We had hoped to display information in a way similar to the book search but books like the Hobbit return multiple results and they are ordered by popularity rather than something sensible.
// Instead, we provided a direct link to the movie database site where that information could be viewed properly.
function retrieveMovie(x){
  var movieOutput = "yes"; 
  // Queries the book title of the associated ISBN using moviedb API key
  fetch("https://api.themoviedb.org/3/search/movie?api_key=5edc4080dc87d1163b33ff4042ceca87&language=en-US&query=" + 
  x + "&page=1&include_adult=false").then(a => a.json()).then(response => { 
      if (response.total_results == 0) {  
        // Output if no related movies are found
        movieOutput = "<p class ='a'>No movies related to this book were found</p>"   
      } else {
        // Prepares title for seach by replacing spaces with + 
        var searchTitle = bookTitle.replace(/ /g, "+");  
        movieOutput = "<p class ='a'>" + response.total_results + " movies related to this book were found</p>";

        // Direct link to moviedb search for booktitle 
        document.getElementById("outputMovie").innerHTML += 
        movieOutput + "<p class ='a'><a href=https://www.themoviedb.org/search?query=" + 
        searchTitle + "> Click here</a> to view them</p>"; 
      } 
    }
  );
  document.getElementById("outputMovie").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
}
