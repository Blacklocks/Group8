//======================================================================
/*
Name:     Caleb Del Rosario (u3190431) & Jason Wood (u3075794)
File:     script.js
Date:     16/10/2020
Purpose:  JavaScript file used to retrieve ISBN of books and display
          relevant data
*/
//======================================================================

var bookTitle = "";

function retrieveISBN(){
  // Select Files Code
  // CODE PULLED FROM: https://web.dev/read-files/
  const fileSelector = document.getElementById('fileSelectorISBN');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });

  // Really basic input validation that checks length of entered text. If the length of the ISBN isn't 10 or 13 characters long, then it will display an error message.
  // Caleb Notes: I'll try to look at how to validate it so it only accepts numerical text on top of text length
  var testISBN = document.getElementById("inputISBN").value;
  if (testISBN.length == 10 || testISBN.length == 13) {
    document.getElementById("testISBN").innerHTML = testISBN
  } else {
    document.getElementById("testISBN").innerHTML = "Entered text is not a valid ISBN"
    return;
  }

  // Retrieves information on book from ISBN entered into textbox after pressing button
  // Caleb Notes: NOT WORKING AS INTENDED AT THE MOMENT, ISBN API not working, had to use Search API. Also, it loads stuff very slowly. 
  // CODE PULLED FROM: https://www.youtube.com/watch?v=LNKuZBYpl4o
  document.getElementById("outputISBN").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
  fetch("https://openlibrary.org/search.json?q=" + document.getElementById("inputISBN").value).then(a => a.json()).then(response => {
      for(var i = 0; i < response.docs.length; i++) {
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
  document.getElementById("outputISBN").innerHTML = "TESTING TO SEE IF PRINT"
}

// Caleb Notes: BELOW ARE JASON'S CHANGES - ADDED COMMENTS TO CLEAR UP EXACTLY WHAT THIS CODE DOES AND DID CODE CLEANUP
// Retrieves isbnlist array from isbn.js file and associates each item in array to a button
function printISBNbtn() {
  document.getElementById("isbnArrBtn").innerHTML
  for (var i = 0; i < isbnlist.length; i++) {
    var id = isbnlist[i];
    var btn = document.createElement("button");
    var t = document.createTextNode(isbnlist[i]);
    btn.value = isbnlist[i];   
    btn.onclick = (function(id) {
      return function() {
        retrieveISBNbutton(id) 
      }
    })(id);
    btn.appendChild(t);
    isbnArrBtn.appendChild(btn);
  }
}

// Retrieves information on book from ISBN associated to button after it is pressed
function retrieveISBNbutton(x){
  //document.getElementById("outputISBN").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
  fetch("https://openlibrary.org/search.json?q=" + x).then(a => a.json()).then(response => {
      for(var i = 0; i < response.docs.length; i++) {
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

// Searches movie database for book title then returns data on relevant movies 
function retrieveMovie(x){
  fetch("https://api.themoviedb.org/3/search/movie?api_key=5edc4080dc87d1163b33ff4042ceca87&language=en-US&query=" + x +"&page=1&include_adult=false").then(a => a.json()).then(response => {
      for(var i = 0; i < 10; i++) {
        // document.getElementById("outputMovie").innerHTML +=  // need to decide what movie info to show  
        // "<h2>" + response.docs[i].title + 
        // "<h2>" + response.docs[i].poster_path[0] +
        // "<br>"+"<br>";
        document.getElementById("outputMovie").innerHTML = "A movie associated with the book " + x + " has been found";
      }
    }
  );
  document.getElementById("outputMovie").innerHTML = "";
}