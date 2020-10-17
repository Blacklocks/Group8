//======================================================================
/*
Name:     Caleb Del Rosario (u3190431) & Jason Wood (u3075794)
File:     script.js
Date:     16/10/2020
Purpose:  JavaScript file used to retrieve ISBN of books and display
          relevant data
*/
//======================================================================



/* document.write(isbnlist);
//for (let i = 0; i < isbnlist.length; i++) {
    
    //make a button for the isbn and offset each one???
    //

    
//}

getData();

function getData(){
const getJSON = async url => {
    const response = await fetch(url);
    return response.json(); // get JSON from the response 
  }
  
  //console.log("Fetching data...");


  getJSON('https://openlibrary.org/isbn/0261102214.json')
    .then(data => console.log(data));
}
document.write(data);
obj = JSON.parse(data);
document.write(data);
document.write(obj); */

// Commented out all the stuff above for a second while I try this. We could delete this and clear it up if not needed

function retrieveISBN(){
  // Select Files Code
  // CODE PULLED FROM: https://web.dev/read-files/
  const fileSelector = document.getElementById('fileSelectorISBN');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });

  // Really basic input validation that checks length of entered text.
  // Caleb Notes: I'll try to look at how to validate it so it only accepts numerical text on top of text length
  var testISBN = document.getElementById("inputISBN").value;
  if (testISBN.length == 10 || testISBN.length == 13) {
    document.getElementById("testISBN").innerHTML = testISBN
  } else {
    document.getElementById("testISBN").innerHTML = "Entered text is not a valid ISBN"
  }

  // Retrieves information on book from ISBN entered into textbox after pressing button
  // Caleb Notes: NOT WORKING AS INTENDED AT THE MOMENT, ISBN API not working, had to use Search API. Also, it loads stuff very slowly. 
  // CODE PULLED FROM: https://www.youtube.com/watch?v=LNKuZBYpl4o
  document.getElementById("outputISBN").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
  fetch("https://openlibrary.org/search.json?q=" + document.getElementById("inputISBN").value).then(a => a.json()).then(response => {
      for(var i = 0; i < response.docs.length; i++) {
        document.getElementById("outputISBN").innerHTML += 
        "<h2>" + response.docs[i].title + 
        "<h2>" + response.docs[i].author_name[0] +
        "<br><img src = 'http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
      }
    }
  );
  document.getElementById("outputISBN").innerHTML = "TESTING TO SEE IF PRINT"
}

// Caleb Notes: BELOW ARE JASON'S CHANGES - ADDED COMMENTS TO CLEAR UP EXACTLY WHAT THIS CODE DOES AND DID CODE CLEANUP
// Retrieves isbnlist array from isbn.js file and associates each item in array to a button
function printISBNbtn() {
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
    //btn.addEventListener("click", retrieveISBNbutton(btn.value));
    btn.appendChild(t);
    document.body.appendChild(btn);
  }
}

// Retrieves information on book from ISBN associated to button after it is pressed
function retrieveISBNbutton(x){
  //document.getElementById("outputISBN").innerHTML = ""; // Resets list so it only shows current results as opposed to old results
  fetch("https://openlibrary.org/search.json?q=" + x).then(a => a.json()).then(response => {
      for(var i = 0; i < response.docs.length; i++) {
        document.getElementById("outputISBN").innerHTML += 
        "<h2>" + response.docs[i].title + 
        "<h2>" + response.docs[i].author_name[0] +
        "<br><img src = 'http://covers.openlibrary.org/b/isbn/" + response.docs[i].isbn[0] + "-M.jpg'><br>";
      }
    }
  );
  document.getElementById("outputISBN").innerHTML = "TESTING TO SEE IF PRINT"
}