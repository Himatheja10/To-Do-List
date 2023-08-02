let todoItemsContainer=document.getElementById("todoItemsContainer");
let savebutton = document.getElementById("savebutton");

function getitemsfromlocalstorage(){
    let storeditems = localStorage.getItem("storeditems");
let storeditemsparse = JSON.parse(storeditems);
if(storeditemsparse === null)
return [];
else
return storeditemsparse;
}

let todolist = getitemsfromlocalstorage()
let todocount = todolist.length;

//localStorage.removeItem("storeditems");

savebutton.onclick = function(){
    localStorage.setItem("storeditems",JSON.stringify(todolist));
    }

   

function onstauschange(checkboxid,labelelid,todoElementid){
   let checkboxcheck = document.getElementById(checkboxid);
   let labelElementsatus = document.getElementById(labelelid);
   labelElementsatus.classList.toggle("checked");
   /*if(checkboxcheck.checked === true){
    labelElementsatus.classList.add("checked");
   }
   else{
    labelElementsatus.classList.remove("checked");
   }*/
   let index = todolist.findIndex(function(each){
    let eachid = "todoElementid" + each.unid;
    if(eachid === todoElementid)return true;
    else return false;
   })
   let todo = todolist[index];
   if(todo.ischecked === true){
    todo.ischecked = false;
   }
   else{
    todo.ischecked = true;
   }
}

function deleteelement(todoElementid){
    let todo = document.getElementById(todoElementid);
     todoItemsContainer.removeChild(todo);
     
     let deletedindex = todolist.findIndex(function(eachitem){
        let eachitemid = "todoElementid" + eachitem.unid;
        
        if(eachitemid === todoElementid) {return true;}
        else {return false;}
     })
     console.log(deletedindex)
     todolist.splice(deletedindex,1);
    
}

function createandappendtodo(todo){
    let todoElementid = "todoElementid" + todo.unid;

    let todoElement = document.createElement("li");
    todoElement.id = todoElementid;
    todoElement.classList.add("todo-items-container","d-flex","flex-row");
    todoItemsContainer.appendChild(todoElement);
    console.log(todoItemsContainer);

    let checkboxid = "checkbox" + todo.unid;
    let labelelid = "labelelid" + todo.unid;
    
    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = checkboxid;
    checkboxElement.checked = todo.ischecked;
    checkboxElement.onclick = function(){
        onstauschange(checkboxid,labelelid,todoElementid)
    }
    checkboxElement.classList.add("checkbox-input");
    todoElement.appendChild(checkboxElement);
    
    let labelcontainer = document.createElement("div");
    labelcontainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelcontainer);
    
    let labelElement = document.createElement("label");
    labelElement.htmlFor = checkboxid;
    labelElement.id = labelelid;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if(todo.ischecked === true){
        labelElement.classList.add("checked")
    }
    else{
        labelElement.classList.remove("checked") 
    }
    labelcontainer.appendChild(labelElement);

    
    let deletediv = document.createElement("div");
    deletediv.classList.add("delete-icon-container");
    labelcontainer.appendChild(deletediv);
    
    let delicon = document.createElement("i");
    delicon.classList.add("far", "fa-trash-alt", "delete-icon");
    
    delicon.onclick = function(){
        deleteelement(todoElementid);
        }
    deletediv.appendChild(delicon);
   
}


for( let  to of todolist){
    createandappendtodo(to);
    console.log(todolist)
}

function onaddtodo(){
    let userinputElement = document.getElementById("todoUserInput");
    let userinputvalue = userinputElement.value;
    if(userinputvalue === ""){
        alert("give some input");
    }

    todocount = todocount + 1;

    let newtodo = {
        text : userinputvalue,
        unid : todocount,
        ischecked : false
    };
    todolist.push(newtodo);
    //console.log(todolist);
    createandappendtodo(newtodo);
    userinputElement.value = "";
}

let addtodo = document.getElementById("addTodoButton");
addtodo.onclick = function(){
    onaddtodo()
    
}

