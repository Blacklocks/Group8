//======================================================================
/*
Name:     Caleb Del Rosario (u3190431) & Jason Wood (u3075794)
File:     script.js
Date:     16/10/2020
Purpose:  JavaScript file used to retrieve ISBN of books and display
          relevant data
*/
//======================================================================

var bookTitle = ""; // global book title variable used for searching movies

function retrieveISBN(){
  // Select Files Code
  // CODE PULLED FROM: https://web.dev/read-files/
  const fileSelector = document.getElementById('fileSelectorISBN');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });
  
  validateISBN(document.getElementById("inputISBN").value);
  if (validateISBN()){return;} //if returns true exits search function
  
  // Retrieves information on book from ISBN entered into textbox after pressing button
  // Caleb Notes: NOT WORKING AS INTENDED AT THE MOMENT, ISBN API not working, had to use Search API. Also, it loads stuff very slowly. 
  // CODE PULLED FROM: https://www.youtube.com/watch?v=LNKuZBYpl4o
  document.getElementById("outputISBN").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
  fetch("https://openlibrary.org/search.json?q=" + document.getElementById("inputISBN").value).then(a => a.json()).then(response => {
      for(var i = 0; i < response.docs.length; i++) { // goes through isbn response and outputs title, author, year and cover image
        document.getElementById("outputISBN").innerHTML += 
        "<h2>" + response.docs[i].title + "</h2>" +
        "<h2>" + response.docs[i].author_name[0] + "</h2>" +
        "<p>Publish Date: " + response.docs[i].first_publish_year + "</p>" +
        "<br><img src = 'http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
        bookTitle =response.docs[i].title;
        console.log(bookTitle); // to test book title has been read
        retrieveMovie(bookTitle);
      }
    }
  );
  document.getElementById("outputISBN").innerHTML = ""
}

  //input validation that checks length of entered text and checks for only numeric values. If the length of the ISBN isn't 10 or 13 characters long or not a number, then it will display an error message.
function validateISBN(x){
    var testISBN = x;
    if (testISBN.length == 10 || testISBN.length == 13 && isNaN(testISBN)==false) {
      document.getElementById("testISBN").innerHTML = testISBN
    } else {
      document.getElementById("testISBN").innerHTML = "Entered text is not a valid ISBN"
      return true; //returns true to exit search 
    }
}

// Retrieves isbnlist array from isbn.js file and associates each item in array to a button
function printISBNbtn() {
  document.getElementById("isbnArrBtn").innerHTML
  for (var i = 0; i < isbnlist.length; i++) {
    var id = isbnlist[i];
    var btn = document.createElement("button");
    var t = document.createTextNode(isbnlist[i]);
    btn.value = isbnlist[i];   
    btn.onclick = (function(id) {   //immediately invoked function expression used for button creation to enable global access to buttons and associated values
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
  fetch("https://openlibrary.org/search.json?q=" + x).then(a => a.json()).then(response => {
      for(var i = 0; i < response.docs.length; i++) { // goes through isbn response and outputs title, author, year and cover image
        document.getElementById("outputISBN").innerHTML += 
        "<h2>" + response.docs[i].title + "</h2>" +
        "<h2>" + response.docs[i].author_name[0] + "</h2>" +
        "<p>Publish Date: " + response.docs[i].first_publish_year + "</p>" +
        "<br><img src = 'http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
        bookTitle = response.docs[i].title;
        document.getElementById("testISBN").innerHTML = bookTitle;
        console.log(bookTitle); // Prints book title to test book title has been read
        retrieveMovie(bookTitle);
      }
    }
  );
  document.getElementById("outputISBN").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
}

// Searches movie database for book title then returns link to moviedb for relevant movies or output if no movies found 
function retrieveMovie(x){
    var movieOutput = "yes"; 
  fetch("https://api.themoviedb.org/3/search/movie?api_key=5edc4080dc87d1163b33ff4042ceca87&language=en-US&query=" + x +"&page=1&include_adult=false").then(a => a.json()).then(response => { //queries book title using moviedb api key
       {
        if (response.total_results == 0){ // Output if no movies found 
            movieOutput = "No movies related to this book were found"   
        }
        else{
            var searchTitle = bookTitle.replace(/ /g, "+"); //Prepares title for seach by replacing spaces with +  
            movieOutput = response.total_results + " movies related to this book were found"
            document.getElementById("outputMovie").innerHTML += 
            movieOutput + "<br>"+
            "<a href=https://www.themoviedb.org/search?query="+searchTitle+"> Click here</a> to view them"; //Direct link to moviedb search for booktitle
        } 
      }
    }
  );
  document.getElementById("outputMovie").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
}
