/*******************************************
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering

Author: Daniel Ross
Date: 1/1/2023
******************************************/ 
const CARDSPERPAGE = 9;
const studentUL = document.getElementsByClassName("student-list")[0];
const paginationUL = document.getElementsByClassName("link-list")[0];
const header = document.getElementsByClassName('header')[0];
let searchBar;
/**
 * 'filteredStudents' array
 * Containes the list of studentobjects that meet the search requirements.
 * initialized with the base data
 */
let filteredStudents = data;
/**
 * 'createElement' function
 * Returns an HTML element with provided tag, class, and specified properties/value pairs
 */
function createElement(tagName,className,prop1,value1,prop2,value2){
   const element = document.createElement(tagName);
   if(className){element.className=className};
   if(prop1&&value1){element[prop1]=value1};
   if(prop2&&value2){element[prop2]=value2};
   return element;
}
/**
 * 'createLi' function
 * Requires a student object in the format of data.js
 * Compiles and returns a list item of a student
 */
function createLi(studentObject){
   const li = createElement('li','student-item');
   const divStudent= createElement('div','student-details');
   divStudent.appendChild(createElement('img','avatar','src',studentObject.picture.large));
   divStudent.appendChild(createElement('h2',undefined,'textContent',`${studentObject.name.first} ${studentObject.name.last}`));
   divStudent.appendChild(createElement('span','email','textContent',studentObject.email));
   const divJoined= createElement('div','joined-details');
   divJoined.appendChild(createElement('span','date','textContent',`Joined ${studentObject.registered.date}`));
   li.appendChild(divStudent);
   li.appendChild(divJoined);
   return li;
}
/**
 * 'showPage' function
 * requires a list of student objects in the format of data.js and a the current page number.
 * decides which students should show on the current page and creates and displays the HTML for them
 */
function showPage(studentList,pgNum) {
   const startIndex = pgNum * CARDSPERPAGE - CARDSPERPAGE;
   const endIndex = pgNum * CARDSPERPAGE - 1;
   studentUL.innerHTML ='';
   for (i=startIndex;i<=endIndex&&i<studentList.length;i++){
      studentUL.appendChild(createLi(studentList[i]));
   }
}
/**
 * 'noMatch' function
 * displays a message to the user if a search results in no students
 */
function noMatch(){
   studentUL.innerHTML ='';
   paginationUL.innerHTML='';
   studentUL.appendChild(createElement('h1',undefined,'textContent','Sorry, no students match your search'));
}
/**
 * 'addPagination function
 * Requires a list of student objects in the format of data.js
 * Determines how many pages are needed, creates the buttons for those pages.
 * Calls showPage defaulting to the first page.
 * If there is no student objects this will call 'noMatch'
 */
function addPagination(studentList){
   if (studentList.length!==0){
      const pageCount = Math.ceil(studentList.length/CARDSPERPAGE);
      paginationUL.innerHTML='';
      for (i=1;i<=pageCount;i++){
         paginationUL.appendChild(createElement('li')).appendChild(createElement('button',undefined,'type','button','textContent',i));
      }
      paginationUL.firstChild.firstChild.className = 'active';
      showPage(studentList,1); 
   } else{
      noMatch();
   }
}
/**
 * 'addSearch' function
 * Creates and displays the searchbar
 * Creates an event listeners for that input.
 *    listens for a keypress or click and calls search function
 */
function addSearch(){
   const label = createElement('label','student-search','for','search');
   label.appendChild(createElement('span',undefined,'textContent','Search by name'));
   searchBar = label.appendChild(createElement('input',undefined,'id','search','placeholder','Search by name...'));
   label.appendChild(createElement('button',undefined,'type','button')).appendChild(createElement('img',undefined,'src','img/icn-search.svg','alt','Search icon'));
   header.appendChild(label);
   label.addEventListener('keyup',()=>{search()});
   label.addEventListener('click',()=>{search()});
}
/**
 * 'search' function
 * clears the filteredStudents, and fills it with student objects who contain the search value.
 *  if the search value is empty resets the filtered array with the base data. 
 * calls addPagination with the new list
 */
function search (){
   if(searchBar.value!==""){
      filteredStudents = [];
      for (student of data){
         if (student.name.first.toLowerCase().includes(searchBar.value)||student.name.last.toLowerCase().includes(searchBar.value)){
            filteredStudents.push(student);
         }
      }
   }else{
      filteredStudents = data;
   }
   addPagination(filteredStudents);
}
/**
 * paginationUl event listener
 * listens for clicks on the page buttons and calls showPage with the new page number.
 */
paginationUL.addEventListener('click',(event)=>{
   const target = event.target;
   if(target.type==='button'&&!target.className){
      document.getElementsByClassName('active')[0].className = '';
      target.className = 'active';
      showPage(filteredStudents,target.textContent);
   }

})
// Call functions
addPagination(data);
addSearch();