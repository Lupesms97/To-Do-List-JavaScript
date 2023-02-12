


// let list = JSON.parse(localStorage.getItem("tasks")) || []
  // variavel global com a lista

// const clearAllTasksBtn = document.getElementById("clear-all-tasks");
const clearAllTasksBtn = document.getElementsByTagName("button")[0];
var lista_tasks = [];


var banco_de_dados = (function() {
    
    return {
        buscar_tasks :  function() {
            var storedTasks = localStorage.getItem('lista-tasks');
            if (storedTasks) {
                lista_tasks = JSON.parse(storedTasks);
            }
            return lista_tasks;
              
        },
        enviar_task: function(task) {
            lista_tasks.push(task);
            listaJSON = JSON.stringify(lista_tasks);
            localStorage.setItem('lista-tasks', listaJSON);
           
        },
        apagar_task: function(index) {
            tasks.splice(index, 1);
            localStorage.setItem("'lista-tasks'", JSON.stringify(lista_tasks));
            
        },
        edit_task : function(index, task) {
            lista_tasks[index] = task;
            localStorage.setItem("'lista-tasks'", JSON.stringify(lista_tasks));
          }
    };  
})();   

// function DisplayTasks() {
//     banco_de_dados.buscar_tasks();
  
    
//     if (lista_tasks === null) {
//       return;
//     }
  
//     // Gera elementos HTML para exibir cada tarefa
//     let taskList = document.getElementById("lista_tasks");
//     taskList.innerHTML = "";
//     for (let i = 0; i < lista_tasks.length; i++) {
//       let task = lista_tasks[i];
//       let taskTitle = document.createElement("h3");
//       taskTitle.innerHTML = task.title;
//       taskList.appendChild(taskTitle);
  
//       let taskDescription = document.createElement("p");
//       taskDescription.innerHTML = task.description;
//       taskList.appendChild(taskDescription);
  
      
//     }
// }
function DisplayTasks() {

    let tasks = banco_de_dados.buscar_tasks();


    if (tasks.length === 0) {
        document.getElementById("tasks-list").innerHTML = "Não há tarefas adicionadas.";
        return;
    }

    let tasksList = document.getElementById("tasks-list");
    tasksList.innerHTML = "";
      
      
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let taskItem = document.createElement("li");
        taskItem.classList.add("ui", "segment");
        taskItem.innerHTML = `
            <div class="ui grid">
            <div class="twelve wide column">
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            </div>
            <div class="four wide column">
            <div class="ui buttons">
                <button class="ui primary button edit-task-button" data-index="${i}">Edit</button>
                <div class="or"></div>
                <button class="ui negative button delete-task-button" data-index="${i}">Delete</button>
            </div>
            </div>
        </div>
        `;
    tasksList.appendChild(taskItem);
  }
  
      
    const taskList = document.getElementById("task-list");
    if (taskList) {
    taskList.innerHTML = taskHTML;
    }


}

function limpar_campos(){
    try {

              
        document.getElementById("task-titulo").value = "";
        document.getElementById("task-descricao").value = "";
        document.getElementById("prazo").value = "";
        campo_select.options.selectedIndex.value = "opt1";

        document.getElementById("spinner-loader").style.display = "initial";
        window.setTimeout(function(){
        document.getElementById("spinner-loader").style.display = "none";
        }, 3000);
       
    } catch (error) {
        
        
    }
}


  




// adiconar task - botão
document.getElementById("add-tasks").onclick = function(){


    banco_de_dados.buscar_tasks();


    // titulo
    var task_Titulo =  document.getElementById("task-titulo").value;

    // descrição
    var task_descricao =  document.getElementById("task-descricao").value;

    // data
    var task_data = document.getElementById("prazo").value;

    // prioridade
    var campo_select  = document.getElementById("prioridade");
    var indice_selecionado = campo_select.options.selectedIndex;
    var valor_selecionado = campo_select.options[indice_selecionado].innerHTML;

    // console.log(task_Titulo);
    // console.log(task_descricao);
    // console.log(task_data);
    // console.log(valor_selecionado);

    var task = {
        "titulo": task_Titulo,
        "descricao": task_descricao,
        "data": task_data,
        "prioridade": valor_selecionado
    };
    
    

    try {           
        banco_de_dados.enviar_task(task);
        
    } catch (error) {

        console.error(error);
        
    }

    limpar_campos();
   
    
 
};

DisplayTasks();
