/* Javascript file for u3075794 &  - Programming for design 16/10/2020 - used by Project2.html */

document.write(isbnlist);

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
document.write(obj);





  

