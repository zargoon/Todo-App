// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
  let userData = inputBox.value; //getting user entered value
  if(userData.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}
showTasks();

 //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo", JSON.stringify(listArr)); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArr = []; //create a blank array
  }else{
    listArr = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArr.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks();
  addBtn.classList.remove("active");

}


// function to add the task list inside u1
function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArr = [];
  }else{
    listArr = JSON.parse(getLocalStorageData); 
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length;
  if(listArr.length > 0){
    deleteAllBtn.classList.add("active");
  }else{
    deleteAllBtn.classList.remove("active");

  }
  let newLiTag = '';
  listArr.forEach((element, index) => {
    newLiTag += `<li> ${element} <span onClick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = "";
  
}


// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorageData);
  listArr.splice(index, 1);
  // after remove the li again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks();


}


// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArr = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //set the item in localstorage
  showTasks(); //call the showTasks function
}